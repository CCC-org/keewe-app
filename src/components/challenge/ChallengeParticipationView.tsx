import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import ThisWeekRecord from './ThisWeekRecord';
import { getFormattedDateArray } from '../../utils/helper/UserSpecificChallengeDateFormatter/formatter';
import TodayBubble from '../../screens/Feed/TodayBubble';
import CircularCheckbox from '../checkbox/CircularCheckbox';
import ChallengeEndDate from './ChallengeEndDate';
import { useTheme } from 'react-native-paper';

interface ChallengeParticipationViewProps {
  current?: number;
  insightPerWeek?: number;
  startDate?: string;
  endDate?: string;
  dayProgresses?: { check: boolean }[];
}

const ChallengeParticipationView = ({
  current,
  insightPerWeek,
  startDate,
  endDate,
  dayProgresses,
}: ChallengeParticipationViewProps) => {
  const theme = useTheme();
  const { formattedWeekWithCheck, today } = useMemo(
    () => getFormattedDateArray(startDate as string, dayProgresses as []),
    [current, insightPerWeek, startDate, endDate, dayProgresses],
  );
  const firstDay = formattedWeekWithCheck[0]?.day ?? '';
  return (
    <View style={styles.container}>
      <View style={styles.upperSection}>
        <ThisWeekRecord
          title="이번 주 기록"
          flexDirection="column"
          current={current}
          goal={insightPerWeek}
        />
        <ChallengeEndDate endDate={endDate} />
      </View>
      <View style={styles.divider} />
      <View style={styles.weekProgress}>
        {formattedWeekWithCheck.map((challenge) => {
          return (
            <View key={challenge.day} style={styles.day}>
              {today === challenge.day && <TodayBubble isFirst={today === firstDay} />}
              <CircularCheckbox isChecked={challenge.progress?.check ?? false} />
              <Text style={{ color: `${theme.colors.graphic.black}80` }}>{challenge.day}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ChallengeParticipationView;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 32,
    paddingVertical: 22,
    backgroundColor: '#F8F8F4',
    borderWidth: 1,
    borderColor: '#1213141a',
    borderRadius: 12,
  },
  upperSection: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 16,
  },
  endDate: {
    marginTop: 10,
    marginBottom: 2,
    alignItems: 'center',
  },
  weekProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 48,
    paddingHorizontal: 24,
  },
  day: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#1213141a',
    marginTop: 16,
    marginHorizontal: 24,
  },
});
