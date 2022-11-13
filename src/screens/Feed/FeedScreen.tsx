import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FeedAPI, FeedQueryKeys } from '../../utils/api/FeedAPI';
import { querySuccessError } from '../../utils/helper/queryReponse/querySuccessError';
import { ScrollView } from 'react-native-gesture-handler';
import { FeedInsight, InsightData } from '../../types/Feed/Feedinsights';
import FeedItem from './FeedItem';
import { useTheme } from 'react-native-paper';

const FeedScreen = ({ navigation }) => {
  const theme = useTheme();
  const { data: feedList, isLoading } = useQuery<FeedInsight['data'] | undefined>(
    FeedQueryKeys.getFeed(),
    () => FeedAPI.getFeed(),
    querySuccessError,
  );

  return (
    <ScrollView contentContainerStyle={styles.feedCtn}>
      <Text style={[theme.fonts.text.display, { marginBottom: 32 }]}>홈</Text>
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
});
