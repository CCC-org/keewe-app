import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { UserSpecificChallenge } from '../../types/Feed/UserSpecificChallenge';
import { useTheme } from 'react-native-paper';
import { getFormattedDateArray } from '../../utils/helper/UserSpecificChallengeDateFormatter/formatter';
import CircularCheckbox from '../../components/checkbox/CircularCheckbox';
import TodayBubble from './TodayBubble';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { rightXml } from '../../../assets/svgs/rightXml';
import { useQuery } from '@tanstack/react-query';
import { ChallengeAPI, ChallengeQueryKeys } from '../../utils/api/ChallengeAPI';
import ThisWeekRecord from '../../components/challenge/ThisWeekRecord';

interface UserSpecificChallengeSectionProps {
  userSpecificChallenge: UserSpecificChallenge['data'];
}

const UserSpecificChallengeSection = ({
  userSpecificChallenge: challenge,
}: UserSpecificChallengeSectionProps) => {
  const { data: myChallengeData } = useQuery<ChallengeGetResponse['data'] | undefined>(
    ChallengeQueryKeys.getChallengeParticipation(),
    () => ChallengeAPI.getChallengeParticipation(),
  );

  if (!challenge) return null;
  const navigation = useNavigation();
  const theme = useTheme();

  const { formattedWeekWithCheck, today } = useMemo(
    () => getFormattedDateArray(challenge.startDate as string, challenge.dayProgresses as []),
    [challenge],
  );

  const thisWeekDoneCount = challenge.dayProgresses.filter((cur) => {
    return cur.check;
  }).length;

  const limitedChallengeName =
    challenge.challengeName.length > 17
      ? challenge.challengeName.slice(0, 18) + '...'
      : challenge.challengeName;

  const firstDay = formattedWeekWithCheck[0].day;
  return (
    <View style={{ paddingBottom: 8 }}>
      <View style={styles.headerCtn}>
        <Text style={theme.fonts.text.headline2}>{limitedChallengeName}</Text>
        <Pressable
          onPress={() =>
            navigation.navigate('ChallengeDetail', {
              challengeId: challenge.challengeId,
              challengeName: challenge.challengeName,
              interest: myChallengeData?.interest,
            })
          }
          hitSlop={{
            left: 50,
            right: 20,
          }}
        >
          <SvgXml xml={rightXml} width={28} />
        </Pressable>
      </View>
      <ThisWeekRecord
        title="이번 주 기록"
        flexDirection="row"
        current={thisWeekDoneCount}
        goal={myChallengeData?.insightPerWeek}
      />
      <View style={styles.weekProgress}>
        {formattedWeekWithCheck.map((challenge) => {
          return (
            <View key={challenge.day} style={styles.day}>
              {today === challenge.day && <TodayBubble isFirst={today === firstDay} />}
              <CircularCheckbox isChecked={challenge.progress.check} />
              <Text style={{ color: '#000000cc' }}>{challenge.day}</Text>
            </View>
          );
        })}
      </View>
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
  challengeText: {
    color: '#12131480',
    marginTop: 2,
  },
  weekProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 48,
    marginBottom: 24,
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
