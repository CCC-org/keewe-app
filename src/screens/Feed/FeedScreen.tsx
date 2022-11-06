import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FeedAPI, FeedQueryKeys } from '../../utils/api/FeedAPI';
import { querySuccessError } from '../../utils/helper/queryReponse/querySuccessError';
import { ScrollView } from 'react-native-gesture-handler';
import { FeedInsight, InsightData } from '../../types/Feed/Feedinsights';
import FeedItem from './FeedItem';

const FeedScreen = ({ navigation }) => {
  const Feed = useQuery<FeedInsight['data'] | undefined>(
    FeedQueryKeys.getFeed(),
    () => FeedAPI.getFeed(),
    querySuccessError,
  );
  console.log('Feed', Feed);
  return (
    <ScrollView contentContainerStyle={styles.feedCtn}>
      {Feed.isLoading ? (
        <Text>로딩중</Text>
      ) : (
        Feed.data?.map((insight) => <FeedItem key={insight.id} insight={insight} />)
      )}
    </ScrollView>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  feedCtn: {},
  feedItem: {
    backgroundColor: 'blue',
  },
});
