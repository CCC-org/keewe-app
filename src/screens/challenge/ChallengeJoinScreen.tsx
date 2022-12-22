import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import Stepper from '../../components/stepper/Stepper';
import ChallengeGoalSettingSection from './ChallengeGoalSettingSection';
import ConditionalButton from '../../components/buttons/ConditionalButton';
import { useTheme } from 'react-native-paper';
import TwoButtonModal from '../../components/modal/TwoButtonModal';

const UNSELECTED = 1;

const ChallengeJoinScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState<boolean>(true);
  const hideModal = () => setModalVisible(false);
  const [recordPerWeek, setRecordPerWeek] = useState<number | number[]>([2]);
  const [participationPerWeek, setParticipationPerWeek] = useState<number | number[]>([2]);
  const [step, setStep] = useState<number>(UNSELECTED);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const isNext = useMemo(() => {
    return step !== 2;
  }, [step]);

  const handleNextClick = () => {
    setIsExpanded(!isExpanded);
    if (isNext) {
      setStep(step + 1);
      return;
    }
    navigation.navigate('ChallengeSubjectCreation', {
      form: { recordPerWeek, participationPerWeek, purpose: 'join' },
    });
  };
  return (
    <>
      <View style={{ margin: 10 }}>
        <TwoButtonModal
          dismissable={false}
          mainTitle={'챌린지는 1개만 참여할 수 있어요.'}
          subTitle={'에서 탈퇴하고 새로운 챌린지에 참여할까요?'}
          visible={modalVisible}
          onDismiss={hideModal}
          leftButtonText={'취소'}
          rightButtonText={'탈퇴하고 참여'}
          leftButtonPress={() => setModalVisible(false)}
          rightButtonPress={() => setModalVisible(false)}
        />
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
      </View>
    </>
  );
};

export default ChallengeJoinScreen;

const styles = StyleSheet.create({});
