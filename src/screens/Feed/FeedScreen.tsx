import { StyleSheet, Text, View, RefreshControl } from 'react-native';
import React, { Fragment, useState } from 'react';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FeedAPI, FeedQueryKeys } from '../../utils/api/FeedAPI';
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
import { InView, IOScrollView } from 'react-native-intersection-observer';
import FeedList from './FeedList';

const FeedScreen = () => {
  const [cursor, setCursor] = useState(0);
  const [limit, setLimit] = useState(5);
  const [follow, setFollow] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const theme = useTheme();
  const feedListQueryClient = useQueryClient();
  const {
    data: feedList,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery<FeedInsight['data'] | undefined>({
    queryKey: FeedQueryKeys.getFeed(),
    queryFn: (context) => {
      return FeedAPI.getFeed(context.pageParam, limit, follow);
    },
    getNextPageParam: (lastpage) => {
      const lastFeedId = lastpage?.[lastpage.length - 1]?.id || 0;
      return lastFeedId;
    },
  });

  const { data: userSpecificChallenge, ...challengeData } = useQuery<
    UserSpecificChallenge['data'] | undefined
  >(UserSpecificChallengeQueryKeys.getUserSpecificChallenge(), () =>
    UserSpecificChallengeAPI.getUserSpecificChallenge(),
  );

  const { mutate: touchBookMark, isLoading: bookMarkIsLoading } = useMutation({
    mutationFn: postFeedBookMark,
    onSettled: () => {
      feedListQueryClient.invalidateQueries(FeedQueryKeys.getFeed());
    },
  });

  const onRefresh = () => {
    setRefreshing(true);
    feedListQueryClient.invalidateQueries(FeedQueryKeys.getFeed());
    feedListQueryClient
      .invalidateQueries(UserSpecificChallengeQueryKeys.getUserSpecificChallenge())
      .then(() => setRefreshing(false));
  };
  if (isLoading || challengeData.isLoading) {
    return <MainLottie />;
  }

  return (
    <IOScrollView
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
      <FeedList
        feedList={feedList}
        fetchNextPage={fetchNextPage}
        touchBookMark={touchBookMark}
        bookMarkIsLoading={bookMarkIsLoading}
      />
    </IOScrollView>
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
