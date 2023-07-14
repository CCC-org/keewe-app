import { Text, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import Stepper from '../../components/stepper/Stepper';
import ChallengeGoalSettingSection from './ChallengeGoalSettingSection';
import ConditionalButton from '../../components/buttons/ConditionalButton';
import { useTheme } from 'react-native-paper';
import TwoButtonModal from '../../components/modal/TwoButtonModal';
import { useQuery } from '@tanstack/react-query';
import { ChallengeAPI, ChallengeQueryKeys } from '../../utils/api/ChallengeAPI';

const UNSELECTED = 1;

const ChallengeJoinScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const hideModal = () => setModalVisible(false);
  const [recordPerWeek, setRecordPerWeek] = useState<number | number[]>([2]);
  const [participationPerWeek, setParticipationPerWeek] = useState<number | number[]>([2]);
  const [step, setStep] = useState<number>(UNSELECTED);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [participated, setParticipated] = useState<boolean>(false);
  const isNext = useMemo(() => {
    return step !== 2;
  }, [step]);

  useQuery(ChallengeQueryKeys.getParticipationCheck(), () => ChallengeAPI.getParticipationCheck(), {
    onSuccess: () => setParticipated(true),
  });

  const { data: challengeParticipation, isLoading: isChallengeParticipationLoading } = useQuery(
    ChallengeQueryKeys.getChallengeParticipation(),
    ChallengeAPI.getChallengeParticipation,
    { enabled: participated },
  );

  const handleNextClick = () => {
    setIsExpanded(!isExpanded);
    if (isNext) {
      setStep(step + 1);
      return;
    }
    navigation.navigate('ChallengeSubjectCreation', {
      form: { recordPerWeek, participationPerWeek, purpose: 'join', ...route.params },
    });
  };

  const { isLoading: isCheckLoading } = useQuery(
    ['challenge', 'participation'],
    () => ChallengeAPI.getParticipationCheck(),
    {
      onSuccess: (response) => {
        if (response.participation) setModalVisible(true);
      },
    },
  );

  return (
    <>
      {!isCheckLoading && (
        <>
          <View style={{ marginHorizontal: 10 }}>
            <Text style={theme.fonts.text.display}>나만의 목표를 세우세요</Text>
          </View>
          <View style={{ marginHorizontal: 6 }}>
            <Stepper totalStep={2} currentStep={1} />
          </View>
          <ChallengeGoalSettingSection
            step={step}
            recordPerWeek={recordPerWeek}
            setRecordPerWeek={setRecordPerWeek}
            participationPerWeek={participationPerWeek}
            setParticipationPerWeek={setParticipationPerWeek}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
          />
          <View style={{ marginTop: 24 }}>
            <ConditionalButton
              isActive={true}
              text={isNext ? '다음' : '완료'}
              color={isNext ? theme.colors.brand.primary.container : theme.colors.graphic.black}
              textColor={isNext ? theme.colors.graphic.black : theme.colors.graphic.white}
              width={150}
              onPress={handleNextClick}
            />
          </View>
        </>
      )}
      <View style={{ margin: 10 }}>
        <TwoButtonModal
          dismissable={false}
          mainTitle={'챌린지는 1개만 참여할 수 있어요.'}
          subTitle={`${challengeParticipation?.name}에서 탈퇴하고 새로운 챌린지에 참여할까요?`}
          visible={modalVisible}
          onDismiss={hideModal}
          leftButtonText={'취소'}
          rightButtonText={'탈퇴하고 참여'}
          leftButtonPress={() => {
            setModalVisible(false);
            navigation.goBack();
          }}
          rightButtonPress={() => setModalVisible(false)}
        />
      </View>
    </>
  );
};

export default ChallengeJoinScreen;
