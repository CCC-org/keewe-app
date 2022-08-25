import React from 'react';
import { Text } from 'react-native-paper';
import ChallengeGoalSettingBar from '../components/etc/ChallengeGoalSettingBar';

const Temp = () => {
  return (
    <ChallengeGoalSettingBar
      value={2}
      minValue={2}
      maxValue={20}
      infoText="챌린지에 몇 주 동안 참여할까요!?"
    />
  );
};

export default Temp;
