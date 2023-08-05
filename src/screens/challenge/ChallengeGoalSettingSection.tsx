import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import Accordion from '../../components/accordions/Accordion';
import ChallengeGoalSettingBar from './ChallengeGoalSettingBar';

interface ChallengeGoalSettingSectionProps {
  step: number;
  recordPerWeek: number | number[];
  setRecordPerWeek: (value: number | number[]) => void;
  participationPerWeek: number | number[];
  setParticipationPerWeek: (value: number | number[]) => void;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const UNSELECTED = 1;

const ChallengeGoalSettingSection = ({
  step,
  recordPerWeek,
  setRecordPerWeek,
  participationPerWeek,
  setParticipationPerWeek,
  isExpanded,
  setIsExpanded,
}: ChallengeGoalSettingSectionProps) => {
  const [currentStep, setCurrentStep] = useState<number>(UNSELECTED);
  function handleClickOpen(selectedStep: number) {
    if (currentStep !== selectedStep) setCurrentStep(selectedStep);
    else setCurrentStep(UNSELECTED);
    setIsExpanded(!isExpanded);
  }

  function handleChangeRecordPerWeek(recordPerWeek: number | number[]) {
    setRecordPerWeek(recordPerWeek);
  }

  function handleChangeParticipationPerWeek(participationPerWeek: number | number[]) {
    setParticipationPerWeek(participationPerWeek);
  }

  return (
    <>
      <Accordion
        isOpen={step === 1 || !isExpanded}
        onClick={() => handleClickOpen(1)}
        openHeight={120}
        duration={200}
        title={<Text style={styles.accordianTitle}>기록 횟수</Text>}
        subTitle={step === 2 ? `매주 ${recordPerWeek}번` : ''}
      >
        <ChallengeGoalSettingBar
          minValue={2}
          maxValue={7}
          onChange={handleChangeRecordPerWeek}
          unit={'번'}
          value={recordPerWeek[0]}
          infoText="일주일에 몇 번 인사이트를 기록할까요?"
        />
      </Accordion>
      {step === 2 && (
        <Accordion
          isOpen={step === 2 && isExpanded}
          onClick={() => handleClickOpen(2)}
          openHeight={120}
          duration={200}
          title={<Text style={styles.accordianTitle}>참여 주차</Text>}
          subTitle={step === 2 ? `${participationPerWeek}주 동안` : ''}
        >
          <ChallengeGoalSettingBar
            minValue={2}
            maxValue={8}
            onChange={handleChangeParticipationPerWeek}
            unit={'주'}
            value={participationPerWeek[0]}
            infoText="챌린지에 몇 주 동안 참여할까요?"
          />
        </Accordion>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  accordianTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ChallengeGoalSettingSection;
