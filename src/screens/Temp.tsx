import React, { useState } from 'react';
import { Text } from 'react-native-paper';
import ChallengeGoalSettingBar from '../components/etc/ChallengeGoalSettingBar';

const Temp = () => {
  const [recodeValue, setRecordValue] = useState(1);
  const [participateWeek, setParticipateWeek] = useState(1);

  const handleRecord = (value: number | number[]) => {
    setRecordValue(value[0]);
  };

  const handleParticipation = (value: number | number[]) => {
    setParticipateWeek(value[0]);
  };

  return (
    <>
      <ChallengeGoalSettingBar
        value={recodeValue}
        minValue={2}
        maxValue={7}
        unit="번"
        infoText="일주일에 몇 번 인사이트를 기록할까요?"
        onChange={handleRecord}
      />
      <ChallengeGoalSettingBar
        value={participateWeek}
        minValue={2}
        maxValue={8}
        unit="주"
        infoText="챌린지에 몇 주 동안 참여할까요!?"
        onChange={handleParticipation}
      />
    </>
  );
};

export default Temp;
