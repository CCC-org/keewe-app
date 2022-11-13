import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FeedAPI, FeedQueryKeys } from '../../utils/api/FeedAPI';
import { querySuccessError } from '../../utils/helper/queryReponse/querySuccessError';
import { ScrollView } from 'react-native-gesture-handler';
import { FeedInsight, InsightData } from '../../types/Feed/Feedinsights';
import FeedItem from './FeedItem';
import { useTheme } from 'react-native-paper';
import { UserSpecificChallenge } from '../../types/Feed/UserSpecificChallenge';
import {
  UserSpecificChallengeAPI,
  UserSpecificChallengeQueryKeys,
} from '../../utils/api/UserSpecificChallenge';
import UserSpecificChallengeSection from './UserSpecificChallengeSection';
import DividerBar from '../../components/bars/DividerBar';

const FeedScreen = ({ navigation }) => {
  const theme = useTheme();
  const { data: feedList, isLoading } = useQuery<FeedInsight['data'] | undefined>(
    FeedQueryKeys.getFeed(),
    () => FeedAPI.getFeed(),
  );

  const { data: userSpecificChallenge, ...challengeData } = useQuery<
    UserSpecificChallenge['data'] | undefined
  >(
    UserSpecificChallengeQueryKeys.getUserSpecificChallenge(),
    () => UserSpecificChallengeAPI.getUserSpecificChallenge(),
    querySuccessError,
  );

  return (
    <ScrollView contentContainerStyle={styles.feedCtn}>
      <Text style={[theme.fonts.text.display, { marginBottom: 32 }]}>홈</Text>
      {challengeData.isLoading ? (
        <Text>챌린지 데이터 로둥중</Text>
      ) : (
        userSpecificChallenge && (
          <UserSpecificChallengeSection userSpecificChallenge={userSpecificChallenge} />
        )
      )}
      <DividerBar style={styles.divider} />
      {isLoading ? (
        <Text>로딩중</Text>
      ) : (
        feedList?.map((insight) => <FeedItem key={insight.id} insight={insight} /> || null)
      )}
    </ScrollView>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  feedCtn: {
    padding: 16.5,
  },
  feedItem: {
    backgroundColor: 'blue',
  },
  divider: {
    backgroundColor: '#f8f8f4',
    borderBottomColor: '#f8f8f4',
    marginBottom: 24,
    height: 12,
    width: '150%',
    marginLeft: 0,
    left: -50,
  },
});
