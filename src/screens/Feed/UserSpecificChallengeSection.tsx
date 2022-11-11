import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { UserSpecificChallenge, Data } from '../../types/Feed/UserSpecificChallenge';
import { isDatePassedMoreThanOneWeek } from '../../utils/string/userSpecificDataDateInterval';
import { useTheme } from 'react-native-paper';

interface UserSpecificChallengeSectionProps {
  userSpecificChallenge: UserSpecificChallenge['data'] | undefined;
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
      startDate: '2022-11-08',
    }));
  }, []);

  if (!userChallenge.startDate) return null;
  const dayOfTheWeek = new Date(userChallenge.startDate).getDay();
  const dayOfTheWeekString = ['일', '월', '화', '수', '목', '금', '토'][dayOfTheWeek];
  return (
    <View>
      <Text style={styles.headerText}>이번주 챌린지도 힘내요! </Text>
      <Text style={[theme.fonts.text.body2.regular, styles.challengeText]}>
        {challenge.challengeName}
      </Text>
      <View></View>
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
  },
});
