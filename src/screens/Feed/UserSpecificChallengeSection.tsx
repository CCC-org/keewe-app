import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { UserSpecificChallenge, Data } from '../../types/Feed/UserSpecificChallenge';
import { isDatePassedMoreThanOneWeek } from '../../utils/string/userSpecificDataDateInterval';
import { useTheme } from 'react-native-paper';
import { getFormattedDateArray } from '../../utils/helper/UserSpecificChallengeDateFormatter/formatter';
import CircularCheckbox from '../../components/checkbox/CircularCheckbox';
import BottomFixButton from '../../components/buttons/BottomFixButton';

interface UserSpecificChallengeSectionProps {
  userSpecificChallenge: UserSpecificChallenge['data'];
}

const UserSpecificChallengeSection = ({
  userSpecificChallenge: challenge,
}: UserSpecificChallengeSectionProps) => {
  const [userChallenge, setUserChallenge] = useState<Partial<Data>>({});
  if (!challenge) return null;

  //   if (isDatePassedMoreThanOneWeek(challenge.startDate))
  //     return (
  //       <View>
  //         <Text>Passed more than one week</Text>
  //       </View>
  //     );
  const theme = useTheme();
  useEffect(() => {
    setUserChallenge((prev) => ({
      ...prev,
      startDate: '2022-11-02',
    }));
  }, []);

  const formattedWeekWithCheck = useMemo(
    () => getFormattedDateArray(userChallenge.startDate as string, challenge.dayProgresses as []),
    [userChallenge],
  );
  console.log(
    '🚀 ~ file: UserSpecificChallengeSection.tsx ~ line 36 ~ formattedWeekWithCheck',
    formattedWeekWithCheck,
  );

  return (
    <View>
      <Text style={styles.headerText}>이번주 챌린지도 힘내요! </Text>
      <Text style={[theme.fonts.text.body2.regular, styles.challengeText]}>
        {challenge.challengeName}
      </Text>
      <View style={styles.weekProgress}>
        {formattedWeekWithCheck.map((challenge) => {
          return (
            <View key={challenge.day} style={styles.day}>
              <CircularCheckbox disabled={challenge.progress.check} />
              <Text>{challenge.day}</Text>
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
    marginTop: 32,
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
