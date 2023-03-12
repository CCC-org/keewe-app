import { RefreshControl, StyleSheet, Text, View } from 'react-native';
import React, { Fragment, useState } from 'react';
import { InfiniteData, QueryClient, UseMutateFunction } from '@tanstack/react-query';
import { InsightData } from '../../types/Feed/Feedinsights';
import { IOScrollView, InView } from 'react-native-intersection-observer';
import FeedItem from './FeedItem';
import { FeedQueryKeys } from '../../utils/api/FeedAPI';
import { UserSpecificChallengeQueryKeys } from '../../utils/api/UserSpecificChallenge';
import { useGetUserId } from '../../utils/hooks/useGetUserId';

interface FeedListProps {
  feedList: InfiniteData<InsightData[] | undefined> | undefined;
  fetchNextPage: () => void;
  touchBookMark: UseMutateFunction<void, unknown, number, unknown>;
  upperComponent?: React.ReactNode;
  feedListQueryClient: QueryClient;
  feedListIsLoading: boolean;
  writer?: { writerId: number; nickname: string; title: string; image: string };
  scrollViewRef?: React.RefObject<any>;
}

const FeedList = ({
  upperComponent: UpperComponent,
  feedList,
  fetchNextPage,
  touchBookMark,
  feedListQueryClient,
  scrollViewRef,
  writer,
}: FeedListProps) => {
  const [pageRefreshing, setPageRefreshing] = useState(false);
  const userId = useGetUserId();
  const onRefresh = () => {
    setPageRefreshing(true);
    feedListQueryClient.invalidateQueries(FeedQueryKeys.getFeed());
    feedListQueryClient
      .invalidateQueries(UserSpecificChallengeQueryKeys.getUserSpecificChallenge())
      .then(() => setPageRefreshing(false));
  };

  return (
    <IOScrollView
      ref={scrollViewRef}
      refreshControl={<RefreshControl refreshing={pageRefreshing} onRefresh={onRefresh} />}
      contentContainerStyle={styles.feedCtn}
    >
      {UpperComponent}
      {feedList?.pages.map((group, i) => {
        return (
          <Fragment key={i}>
            {group?.map((insight, idx) => {
              if (!insight.writer && writer) {
                insight.writer = writer;
              }
              if (!insight.writer && writer) {
                insight.writer = writer;
              }
              if (!insight.writer && writer) {
                insight.writer = writer;
              }
              if (group.length - 1 === idx && feedList.pages.length - 1 === i) {
                return (
                  <InView key={insight.id} onChange={() => fetchNextPage()}>
                    <FeedItem
                      onBookMarkClick={touchBookMark}
                      insight={insight}
                      localId={String(userId)}
                    />
                  </InView>
                );
              }
              return (
                <Fragment key={insight.id}>
                  <FeedItem
                    onBookMarkClick={touchBookMark}
                    key={insight.id}
                    insight={insight}
                    localId={String(userId)}
                  />
                </Fragment>
              );
            })}
          </Fragment>
        );
      })}
    </IOScrollView>
  );
};

export default FeedList;

const styles = StyleSheet.create({
  feedCtn: {
    padding: 16.5,
  },
});
