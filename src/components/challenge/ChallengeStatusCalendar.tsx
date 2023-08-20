import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

interface ChallengeStatusCalendarProps {
  duration?: number;
  startDate?: string;
  recordedDates?: string[];
}

const ChallengeStatusCalendar = ({
  duration,
  startDate = '2023-01-01',
  recordedDates,
}: ChallengeStatusCalendarProps) => {
  const theme = useTheme();

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  const date = new Date(startDate);
  const dayIndex = date.getDay();

  return (
    <View>
      <View style={styles.daysContainer}>
        <View style={styles.days}>
          {daysOfWeek.map((day, index) => (
            <Text
              key={day}
              style={{
                ...theme.fonts.text.caption1,
                color: `${theme.colors.graphic.black}80`,
              }}
            >
              {daysOfWeek[(dayIndex + index) % 7]}
            </Text>
          ))}
        </View>
      </View>
      {Array.from({ length: duration ?? 0 }, (_, index) => (
        <OneWeekRow
          key={index}
          order={index + 1}
          recordedDates={recordedDates}
          startDate={startDate}
        />
      ))}
    </View>
  );
};

export default ChallengeStatusCalendar;

interface OneWeekRowProps {
  order?: number;
  startDate?: string;
  recordedDates?: string[];
}

const OneWeekRow = ({ order = 1, recordedDates, startDate }: OneWeekRowProps) => {
  const theme = useTheme();

  const WeeksCountFromStartDate = Math.floor(calculateDaysFromToday(startDate) / 7) + 1;

  return (
    <View style={styles.rowContainer}>
      {WeeksCountFromStartDate === order ? (
        <Text
          style={{
            ...theme.fonts.text.body2.bold,
            color: theme.colors.graphic.orange,
            marginLeft: 8,
          }}
        >
          {order}주
        </Text>
      ) : (
        <Text
          style={{
            ...theme.fonts.text.caption1,
            color: `${theme.colors.graphic.black}80`,
            marginLeft: 8,
          }}
        >
          {order}주
        </Text>
      )}

      <View style={styles.circlesContainer}>
        {Array.from({ length: 7 }, (_, index) => {
          const daysAfterStartDate = (order - 1) * 7 + index;
          const targetDate = startDate ? addDaysToDate(startDate, daysAfterStartDate) : '';
          const isRecordedDay = recordedDates?.includes(targetDate);
          return isRecordedDay ? (
            <View style={styles.recordedCircle}>
              <Text style={{ ...theme.fonts.text.podkova.bold, color: theme.colors.graphic.white }}>
                {recordedDates ? recordedDates.indexOf(targetDate) + 1 : 1}
              </Text>
            </View>
          ) : (
            <View key={index} style={styles.dottedCircle}></View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 12,
  },
  days: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  circlesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '81%',
    marginRight: 6,
  },
  dottedCircle: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#E1E1D0',
    borderRadius: 20,
    borderStyle: 'dotted',
  },
  recordedCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
    backgroundColor: '#FF9417',
    borderRadius: 20,
  },
});

function addDaysToDate(dateString, days) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function calculateDaysFromToday(targetDate) {
  const currentDate = new Date();
  const targetDateObj = new Date(targetDate);

  const timeDifference = currentDate.getTime() - targetDateObj.getTime();

  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
}
