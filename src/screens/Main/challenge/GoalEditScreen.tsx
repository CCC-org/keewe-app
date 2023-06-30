import React, { useLayoutEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import HeaderRightButton from '../../../components/header/HeaderRightButton';
import theme from '../../../theme/light';
import ChallengeGoalSettingSection from '../../challenge/ChallengeGoalSettingSection';

const UNSELECTED = 1;

const GoalEditScreen = ({ navigation, route }) => {
  const { currentRecord, currentParticipation, setRecord, setParticipation } = route.params;
  const [recordPerWeek, setRecordPerWeek] = useState<number | number[]>([currentRecord]);
  const [participationPerWeek, setParticipationPerWeek] = useState<number | number[]>([
    currentParticipation,
  ]);
  const [step, setStep] = useState<number>(UNSELECTED);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const isNext = useMemo(() => {
    return step !== 2;
  }, [step]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton
          text={step !== 2 ? '다음' : '완료'}
          backGroundColor={theme.colors.brand.primary.main}
          textColor={theme.colors.graphic.black}
          borderLine={false}
          disabled={false}
          handlePress={handleComplete}
        />
      ),
    });
  }, [step, participationPerWeek, recordPerWeek]);

  const handleComplete = () => {
    setIsExpanded(!isExpanded);
    if (isNext) {
      setStep(step + 1);
      return;
    }
    setRecord(recordPerWeek[0]);
    setParticipation(participationPerWeek[0]);
    navigation.goBack();
  };

  return (
    <>
      <View style={{ margin: 10 }}>
        <ChallengeGoalSettingSection
          step={step}
          recordPerWeek={recordPerWeek}
          setRecordPerWeek={setRecordPerWeek}
          participationPerWeek={participationPerWeek}
          setParticipationPerWeek={setParticipationPerWeek}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
      </View>
    </>
  );
};

export default GoalEditScreen;
