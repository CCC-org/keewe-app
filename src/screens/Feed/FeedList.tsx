import { RefreshControl, StyleSheet, Text, View } from 'react-native';
import React, { Fragment, useState } from 'react';
import { InfiniteData, QueryClient, UseMutateFunction } from '@tanstack/react-query';
import { InsightData } from '../../types/Feed/Feedinsights';
import { IOScrollView, InView } from 'react-native-intersection-observer';
import FeedItem from './FeedItem';
import { FeedQueryKeys } from '../../utils/api/FeedAPI';
import { UserSpecificChallengeQueryKeys } from '../../utils/api/UserSpecificChallenge';
import DividerBar from '../../components/bars/DividerBar';

interface FeedListProps {
  feedList: InfiniteData<InsightData[] | undefined> | undefined;
  fetchNextPage: () => void;
  touchBookMark: UseMutateFunction<void, unknown, number, unknown>;
  // bookMarkIsLoading: boolean;
  // UpperComponent is not required, but used in FeedScreen.tsx for to display the user's current streak
  upperComponent?: React.ReactNode;
  feedListQueryClient: QueryClient;
  feedListIsLoading: boolean;
}

const FeedList = ({
  upperComponent: UpperComponent,
  feedList,
  fetchNextPage,
  touchBookMark,
  // bookMarkIsLoading,
  feedListQueryClient,
  feedListIsLoading,
}: FeedListProps) => {
  const [pageRefreshing, setPageRefreshing] = useState(false);

  const onRefresh = () => {
    setPageRefreshing(true);
    feedListQueryClient.invalidateQueries(FeedQueryKeys.getFeed());
    feedListQueryClient
      .invalidateQueries(UserSpecificChallengeQueryKeys.getUserSpecificChallenge())
      .then(() => setPageRefreshing(false));
  };

  return (
    <IOScrollView
      refreshControl={<RefreshControl refreshing={pageRefreshing} onRefresh={onRefresh} />}
      contentContainerStyle={styles.feedCtn}
    >
      {/* UpperComponent will render undefined, which does not affect this component.  */}
      {UpperComponent}
      <DividerBar style={styles.divider} />

      {feedList?.pages.map((group, i) => {
        return (
          <Fragment key={i}>
            {group?.map((insight, idx) => {
              if (group.length - 1 === idx && feedList.pages.length - 1 === i) {
                return (
                  <InView key={insight.id} onChange={() => fetchNextPage()}>
                    <FeedItem onBookMarkClick={touchBookMark} insight={insight} />
                  </InView>
                );
              }
              return (
                <Fragment key={insight.id}>
                  <Text>{insight.id}</Text>
                  <FeedItem onBookMarkClick={touchBookMark} key={insight.id} insight={insight} />
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
