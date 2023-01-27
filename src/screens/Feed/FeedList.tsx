import { StyleSheet, Text, View } from 'react-native';
import React, { Fragment } from 'react';
import { InfiniteData, UseMutateFunction } from '@tanstack/react-query';
import { InsightData } from '../../types/Feed/Feedinsights';
import { InView } from 'react-native-intersection-observer';
import FeedItem from './FeedItem';

interface FeedListProps {
  feedList: InfiniteData<InsightData[] | undefined> | undefined;
  fetchNextPage: () => void;
  touchBookMark: UseMutateFunction<void, unknown, number, unknown>;

  bookMarkIsLoading: boolean;
}

const FeedList = ({ feedList, fetchNextPage, touchBookMark, bookMarkIsLoading }: FeedListProps) => {
  return (
    <View>
      {feedList?.pages.map((group, i) => {
        return (
          <Fragment key={i}>
            {group?.map((insight, idx) => {
              if (group.length - 1 === idx && feedList.pages.length - 1 === i) {
                return (
                  <InView key={insight.id} onChange={() => fetchNextPage()}>
                    <FeedItem
                      bookMarkIsLoading={bookMarkIsLoading}
                      onBookMarkClick={touchBookMark}
                      insight={insight}
                    />
                  </InView>
                );
              }
              return (
                <Fragment key={insight.id}>
                  <Text>{insight.id}</Text>
                  <FeedItem
                    bookMarkIsLoading={bookMarkIsLoading}
                    onBookMarkClick={touchBookMark}
                    key={insight.id}
                    insight={insight}
                  />
                </Fragment>
              );
            })}
          </Fragment>
        );
      })}
    </View>
  );
};

export default FeedList;

const styles = StyleSheet.create({});
