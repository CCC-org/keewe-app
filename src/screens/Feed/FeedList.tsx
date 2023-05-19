import { StyleSheet } from 'react-native';
import React, { Fragment } from 'react';
import { InfiniteData, QueryClient, UseMutateFunction } from '@tanstack/react-query';
import { InView } from 'react-native-intersection-observer';
import FeedItem from './FeedItem';
import { ScrollView } from 'react-native-gesture-handler';
import { useGetUserId } from '../../utils/hooks/useGetUserId';
import { InsightData, InsightWriter } from '../../types/Feed/Feedinsights';

interface FeedListProps {
  feedList: InfiniteData<InsightData[] | undefined> | undefined;
  fetchNextPage: () => void;
  touchBookMark: UseMutateFunction<void, unknown, number, unknown>;
  upperComponent?: React.ReactNode;
  feedListQueryClient: QueryClient;
  feedListIsLoading: boolean;
  writer?: InsightWriter;
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
  const userId = useGetUserId();

  return (
    <ScrollView contentContainerStyle={styles.feedCtn} ref={scrollViewRef}>
      {UpperComponent}
      {feedList?.pages.map((group, i) => {
        return (
          <Fragment key={i}>
            {group?.map((insight, idx) => {
              if (!insight.writer && writer) {
                insight.writer = writer;
              }

              if (group.length - 1 === idx && feedList.pages.length - 1 === i) {
                return (
                  <InView
                    key={insight.id}
                    onChange={() => {
                      fetchNextPage();
                    }}
                  >
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
    </ScrollView>
  );
};

export default FeedList;

const styles = StyleSheet.create({
  feedCtn: {
    padding: 16.5,
  },
});
