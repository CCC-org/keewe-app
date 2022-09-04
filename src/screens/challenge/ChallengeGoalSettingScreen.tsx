import React, { useState, useMemo } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import ConditionalButton from '../../components/buttons/ConditionalButton';
import Stepper from '../../components/stepper/Stepper';
import HeaderText from '../../components/texts/HeaderText';
import ChallengeGoalSettingSection from './ChallengeGoalSettingSection';

const UNSELECTED = 1;

const ChallengeGoalSettingScreen = ({ navigation, route }) => {
  const theme = useTheme();
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
      form: { recordPerWeek, participationPerWeek, ...route.params.form },
    });
  };

  return (
    <>
      <View style={{ margin: 10 }}>
        <HeaderText header="나만의 목표를 세우세요" subTitle=""></HeaderText>
        <Stepper totalStep={3} currentStep={3} />
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
            color={isNext ? theme.colors.brand.primary.main : theme.colors.graphic.black}
            textColor={isNext ? theme.colors.graphic.black : theme.colors.graphic.white}
            width={150}
            onPress={handleNextClick}
          />
        </View>
      </View>
    </>
  );
};

export default ChallengeGoalSettingScreen;
