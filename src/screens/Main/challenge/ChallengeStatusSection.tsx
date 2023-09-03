import { StyleSheet, View } from 'react-native';
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
import ChallengeStatusCalendar from '../../../components/challenge/ChallengeStatusCalendar';

const ChallengeStatusSection = () => {
  const theme = useTheme();

  const { data } = useQuery<ChallengeStatusData | undefined>(
    UserSpecificChallengeQueryKeys.getUserChallengeStatus(),
    () => UserSpecificChallengeAPI.getUserChallengeStatus(),
  );
  return (
    <View style={{ backgroundColor: theme.colors.brand.surface.main, ...styles.container }}>
      <View style={styles.header}>
        <ThisWeekRecord
          flexDirection="column"
          title="전체 기록"
          current={data?.current}
          goal={data?.total}
        />
        <ChallengeEndDate endDate={data?.endDate} />
      </View>
      <View style={styles.divider} />
      <ChallengeStatusCalendar
        duration={data?.duration}
        recordedDates={data?.recordedDates}
        startDate={data?.startDate}
      />
    </View>
  );
};

export default ChallengeStatusSection;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1213141a',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#1213141a',
    marginTop: 10,
    marginBottom: 16,
    marginHorizontal: 8,
  },
});
