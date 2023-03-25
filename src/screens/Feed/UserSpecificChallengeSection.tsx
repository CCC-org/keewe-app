import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { UserSpecificChallenge, Data } from '../../types/Feed/UserSpecificChallenge';
import { isDatePassedMoreThanOneWeek } from '../../utils/string/userSpecificDataDateInterval';
import { useTheme } from 'react-native-paper';
import { getFormattedDateArray } from '../../utils/helper/UserSpecificChallengeDateFormatter/formatter';
import CircularCheckbox from '../../components/checkbox/CircularCheckbox';
import BottomFixButton from '../../components/buttons/BottomFixButton';
import { formatChallengeText } from '../../utils/helper/UserSpecificChallengeDateFormatter/challengeTextFormatter';
import { AntDesign } from '@expo/vector-icons';
import TodayBubble from './TodayBubble';

interface UserSpecificChallengeSectionProps {
  userSpecificChallenge: UserSpecificChallenge['data'];
}

const UserSpecificChallengeSection = ({
  userSpecificChallenge: challenge,
}: UserSpecificChallengeSectionProps) => {
  if (!challenge) return null;

  const theme = useTheme();

  const { formattedWeekWithCheck, today } = useMemo(
    () => getFormattedDateArray(challenge.startDate as string, challenge.dayProgresses as []),
    [challenge],
  );

  const challengeHeaderText = formatChallengeText(challenge.remain, challenge.startDate);

  const firstDay = formattedWeekWithCheck[0].day;
  return (
    <View style={{ paddingBottom: 8 }}>
      <View style={styles.headerCtn}>
        <Text style={styles.headerText}>{challengeHeaderText}</Text>
        <AntDesign
          name="arrowright"
          size={24}
          color="black"
          onPress={() => alert('챌린지 상세 ')}
        />
      </View>

      <Text style={[theme.fonts.text.body2.regular, styles.challengeText]}>
        {challenge.challengeName}
      </Text>
      <View style={styles.weekProgress}>
        {formattedWeekWithCheck.map((challenge) => {
          return (
            <View key={challenge.day} style={styles.day}>
              {today === challenge.day && <TodayBubble isFirst={today === firstDay} />}
              <CircularCheckbox isChecked={challenge.progress.check} />
              <Text style={{ color: '#00000050' }}>{challenge.day}</Text>
            </View>
          );
        })}
      </View>
      <BottomFixButton
        isActive={true}
        text={'챌린지에 인사이트 적기'}
        width={100}
        onPress={() => alert('pressed')}
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
      />
    </View>
  );
};

export default UserSpecificChallengeSection;

const styles = StyleSheet.create({
  headerCtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontFamily: 'pretendardSemiBold',
  },
  challengeText: {
    color: '#12131450',
    marginTop: 2,
  },
  weekProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 48,
    marginBottom: 18,
    paddingHorizontal: 8,
  },
  day: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#e0f6a2',
    marginBottom: 18,
  },
  buttonText: {
    color: '#486006',
  },
});
