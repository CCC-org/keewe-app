import { StyleSheet, Text, View, RefreshControl, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FeedAPI, FeedQueryKeys } from '../../utils/api/FeedAPI';
import { querySuccessError } from '../../utils/helper/queryReponse/querySuccessError';
// import { ScrollView } from 'react-native-gesture-handler';
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
import { postFeedBookMark } from '../../utils/api/FeedBookMark';
import MainLottie from '../../components/lotties/MainLottie';

const FeedScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  const theme = useTheme();
  const feedListQueryClient = useQueryClient();
  const { data: feedList, isLoading } = useQuery<FeedInsight['data'] | undefined>(
    FeedQueryKeys.getFeed(),
    () => FeedAPI.getFeed(),
  );

  console.log('asdf');
  const { data: userSpecificChallenge, ...challengeData } = useQuery<
    UserSpecificChallenge['data'] | undefined
  >(
    UserSpecificChallengeQueryKeys.getUserSpecificChallenge(),
    () => UserSpecificChallengeAPI.getUserSpecificChallenge(),
    querySuccessError,
  );

  const { mutate: touchBookMark } = useMutation(postFeedBookMark, {
    onMutate: async (id) => {
      await feedListQueryClient.cancelQueries(FeedQueryKeys.getFeed());
      const previousFeedList = feedListQueryClient.getQueryData(FeedQueryKeys.getFeed());
      feedListQueryClient.setQueryData(FeedQueryKeys.getFeed(), (old: any) => {
        const newFeedList = old?.map((feed) => {
          if (feed.id === id) {
            return {
              ...feed,
              bookmark: !feed.bookmark,
            };
          }
          return feed;
        });
        return newFeedList;
      });
      return { previousFeedList };
    },

    onError: (err, variables, context) => {
      console.error(err);
      feedListQueryClient.setQueryData(FeedQueryKeys.getFeed(), context!.previousFeedList);
    },
    onSettled: () => {
      feedListQueryClient.invalidateQueries(FeedQueryKeys.getFeed());
    },
  });

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
    feedListQueryClient.invalidateQueries(FeedQueryKeys.getFeed());
    feedListQueryClient.invalidateQueries(
      UserSpecificChallengeQueryKeys.getUserSpecificChallenge(),
    );
  };

  if (isLoading || challengeData.isLoading) {
    return <MainLottie />;
  }

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      contentContainerStyle={styles.feedCtn}
    >
      <Text style={[theme.fonts.text.display, { marginBottom: 32 }]}>홈</Text>
      <View>
        {userSpecificChallenge && (
          <UserSpecificChallengeSection userSpecificChallenge={userSpecificChallenge} />
        )}
      </View>
      <DividerBar style={styles.divider} />
      {isLoading ? (
        <Text>로딩중</Text>
      ) : (
        feedList?.map((insight) => (
          <FeedItem onBookMarkClick={touchBookMark} key={insight.id} insight={insight} />
        ))
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
