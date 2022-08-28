import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Accordion from '../../components/accordions/Accordion';
import ChallengeGoalSettingBar from './ChallengeGoalSettingBar';

interface ChallengeGoalSettingSectionProps {
  recordPerWeek: number | number[];
  setRecordPerWeek: (value: number | number[]) => void;
  participationPerWeek: number | number[];
  setParticipationPerWeek: (value: number | number[]) => void;
}

const ChallengeGoalSettingSection = ({
  recordPerWeek,
  setRecordPerWeek,
  participationPerWeek,
  setParticipationPerWeek,
}: ChallengeGoalSettingSectionProps) => {
  const [isOpen, setIsOpen] = React.useState(true);

  function handleClickOpen() {
    setIsOpen(!isOpen);
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
        isOpen={isOpen}
        onClick={handleClickOpen}
        openHeight={120}
        title={<Text style={styles.accordianTitle}>기록 횟수</Text>}
      >
        <ChallengeGoalSettingBar
          minValue={1}
          maxValue={8}
          onChange={handleChangeRecordPerWeek}
          unit={'번'}
          value={recordPerWeek[0]}
          infoText="일주일에 몇 번 인사이트를 기록할까요?"
        />
      </Accordion>
      <Accordion
        isOpen={!isOpen}
        onClick={handleClickOpen}
        openHeight={120}
        title={<Text style={styles.accordianTitle}>참여 주차</Text>}
      >
        <ChallengeGoalSettingBar
          minValue={1}
          maxValue={8}
          onChange={handleChangeParticipationPerWeek}
          unit={'주'}
          value={participationPerWeek[0]}
          infoText="챌린지에 몇 주 동안 참여할까요?"
        />
      </Accordion>
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
