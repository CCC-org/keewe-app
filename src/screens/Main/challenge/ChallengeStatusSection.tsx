import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { useQuery } from '@tanstack/react-query';
import {
  UserSpecificChallengeAPI,
  UserSpecificChallengeQueryKeys,
} from '../../../utils/api/UserSpecificChallenge';
import { ChallengeStatusData } from '../../../types/Feed/UserSpecificChallenge';
import ThisWeekRecord from '../../../components/challenge/ThisWeekRecord';
import ChallengeEndDate from '../../../components/challenge/ChallengeEndDate';

const ChallengeStatusSection = () => {
  const theme = useTheme();

  const { data } = useQuery<ChallengeStatusData | undefined>(
    UserSpecificChallengeQueryKeys.getUserChallengeStatus(),
    () => UserSpecificChallengeAPI.getUserChallengeStatus(),
  );
  return (
    <View style={{ backgroundColor: theme.colors.brand.surface.container1, ...styles.container }}>
      <View style={styles.header}>
        <ThisWeekRecord
          flexDirection="column"
          title="전체 기록"
          current={data?.current}
          goal={data?.total}
        />
        <ChallengeEndDate endDate={data?.endDate} />
      </View>
    </View>
  );
};

export default ChallengeStatusSection;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#1213141a',
    borderRadius: 12,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
