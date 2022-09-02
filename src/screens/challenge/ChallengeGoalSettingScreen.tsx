import React, { useState, useMemo } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import ConditionalButton from '../../components/buttons/ConditionalButton';
import Stepper from '../../components/stepper/Stepper';
import ChallengeGoalSettingSection from './ChallengeGoalSettingSection';

const UNSELECTED = -1;

const ChallengeGoalSettingScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const [recordPerWeek, setRecordPerWeek] = useState<number | number[]>([1]);
  const [participationPerWeek, setParticipationPerWeek] = useState<number | number[]>([1]);
  const [step, setStep] = useState<number>(UNSELECTED);
  const isNext = useMemo(() => {
    return step !== 2;
  }, [step]);

  const handleNextClick = () => {
    if (isNext) {
      setStep(step + 1);
      return;
    }
    navigation.navigate('ChallengeSubjectCreationScreen', {
      form: { recordPerWeek, participationPerWeek, ...route.params.form },
    });
  };

  return (
    <>
      <View style={{ margin: 10 }}>
        <Text style={theme.fonts.text.display}>나만의 목표를 세우세요</Text>
        <Stepper totalStep={3} currentStep={3} />
        <ChallengeGoalSettingSection
          step={step}
          recordPerWeek={recordPerWeek}
          setRecordPerWeek={setRecordPerWeek}
          participationPerWeek={participationPerWeek}
          setParticipationPerWeek={setParticipationPerWeek}
        />
        <ConditionalButton
          isActive={true}
          text={isNext ? '다음' : '완료'}
          color={'black'}
          width={150}
          onPress={handleNextClick}
        />
      </View>
    </>
  );
};

export default ChallengeGoalSettingScreen;
