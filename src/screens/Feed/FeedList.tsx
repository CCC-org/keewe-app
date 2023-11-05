import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import React, { Fragment } from 'react';
import { InfiniteData, QueryClient, UseMutateFunction } from '@tanstack/react-query';
import { InView } from 'react-native-intersection-observer';
import FeedItem from './FeedItem';
import { ScrollView } from 'react-native-gesture-handler';
import { useGetUserId } from '../../utils/hooks/useGetUserId';

interface FeedListProps {
  feedList: InfiniteData<InsightData[] | undefined> | undefined;
  fetchNextPage: () => void;
  touchBookMark?: UseMutateFunction<void, unknown, number, unknown>;
  upperComponent?: React.ReactNode;
  feedListQueryClient?: QueryClient;
  feedListIsLoading: boolean;
  writer?: InsightWriter;
  scrollViewRef?: React.RefObject<any>;
  scrollStyle?: StyleProp<ViewStyle>;
}

const FeedList = ({
  upperComponent: UpperComponent,
  feedList,
  fetchNextPage,
  touchBookMark,
  scrollViewRef,
  writer,
  scrollStyle,
}: FeedListProps) => {
  const userId = useGetUserId();

  return (
    <ScrollView contentContainerStyle={[styles.feedCtn, scrollStyle]} ref={scrollViewRef}>
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
