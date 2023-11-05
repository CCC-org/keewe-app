import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { SearchContext } from './SearchScreen';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import httpClient from '../../utils/api/BaseHttpClient';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IOScrollView } from 'react-native-intersection-observer';
import FeedList from '../Feed/FeedList';
import { useTheme } from 'react-native-paper';
import { useScrollToTop } from '@react-navigation/native';
import { notificationKeys } from '../../utils/api/notification/notification';
import GoToUploadButton from '../../components/buttons/GoToUploadButton';
import { useInfiniteFeed } from '../../utils/hooks/feedInifiniteScroll/useInfiniteFeed';
interface fetchSearchInsightsParams {
  searchText: string;
  page: number;
  limit: number;
}

const fetchSearchInsights = async ({
  searchText = 'test',
  page,
  limit,
}: fetchSearchInsightsParams) => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.append('keyword', searchText);
  urlSearchParams.append('searchType', 'INSIGHT');
  urlSearchParams.append('limit', limit.toString());
  if (page > 0) {
    urlSearchParams.append('cursor', page.toString());
  }

  const queryString = urlSearchParams.toString();
  const requestUrl = `https://api-keewe.com/api/v1/search?${queryString}`;
  console.log('Request URL:', requestUrl); // Debugging: Log the full request URL

  try {
    const response = await httpClient.get<InsightData[]>(requestUrl);
    return response.data;
  } catch (error) {
    console.error('search insight screen', error);
    throw error;
  }
};

const SearchInsightScreen = () => {
  const { searchText } = useContext(SearchContext);

  const {
    data: feedList,
    fetchNextPage,
    isLoading: feedListIsLoading,
  } = useInfiniteQuery<InsightData[] | undefined>({
    queryKey: ['search', searchText],
    queryFn: ({ pageParam = 0 }) => fetchSearchInsights({ searchText, page: pageParam, limit: 10 }),
  });

  const scrollViewRef = useRef<any>(null);

  if (feedListIsLoading) {
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
  }
  if (!feedList) {
    return (
      <View>
        <Text>feedList is undefined</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <IOScrollView ref={scrollViewRef}>
        <FeedList
          scrollViewRef={scrollViewRef}
          feedList={feedList}
          fetchNextPage={fetchNextPage}
          feedListIsLoading={feedListIsLoading}
        />
      </IOScrollView>
      <GoToUploadButton />
    </SafeAreaView>
  );
};

export default SearchInsightScreen;

const styles = StyleSheet.create({});
