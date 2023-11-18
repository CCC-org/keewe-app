import React, { useContext, useRef, useState } from 'react';
import { SearchContext } from './SearchScreen';
import { InfiniteData, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import httpClient from '../../utils/api/BaseHttpClient';
import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IOScrollView } from 'react-native-intersection-observer';
import FeedList from '../Feed/FeedList';
import { useTheme } from 'react-native-paper';
import { useScrollToTop } from '@react-navigation/native';
import { notificationKeys } from '../../utils/api/notification/notification';
import GoToUploadButton from '../../components/buttons/GoToUploadButton';
import { useInfiniteFeed } from '../../utils/hooks/feedInifiniteScroll/useInfiniteFeed';
import ThreeDotsXml from '../../constants/Icons/DetailedPost/ThreeDotsXml';
import MainLottie from '../../components/lotties/MainLottie';
import NoResultScreen from '../../components/misc/NoResultScreen';
import FeedItem from '../Feed/FeedItem';
import { useGetUserId } from '../../utils/hooks/useGetUserId';
import { postFeedBookMark } from '../../utils/api/FeedBookMark';
import Toast from 'react-native-toast-message';
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
  console.log('Request URL:', requestUrl);

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
  const userId = useGetUserId();
  const queryClient = useQueryClient();
  const scrollViewRef = useRef(null);

  const {
    data: feedList,
    isLoading: feedListIsLoading,
    fetchNextPage,
  } = useInfiniteQuery<InsightData[] | undefined>({
    queryKey: ['search', searchText],
    queryFn: ({ pageParam = 0 }) => fetchSearchInsights({ searchText, page: pageParam, limit: 2 }),
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.length === 0) {
        return undefined;
      }
      return lastPage[lastPage.length - 1]?.id;
    },
  });

  const { mutate: touchBookMark } = useMutation({
    mutationFn: postFeedBookMark,
    onMutate: (id: number) => {
      const prev = queryClient.getQueryData<InfiniteData<InsightData[]>>(['search', searchText]);
      if (!prev) return;
      for (const page of prev.pages) {
        for (const info of page) {
          if (info.id === id) {
            info.bookmark = !info.bookmark;
            Toast.show({
              type: 'snackbar',
              text1: info.bookmark ? '북마크에 저장했어요.' : '북마크에서 삭제했어요.',
              position: 'bottom',
            });
          }
        }
      }
      queryClient.setQueryData(['search', searchText], prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['search', searchText]);
    },
  });

  const onEndReached = () => {
    console.log('reached');
    fetchNextPage();
  };

  if (feedListIsLoading) return <MainLottie />;
  if (!feedList) return <NoResultScreen />;

  const flatMap = feedList.pages.flatMap((page) => page);
  if (flatMap.length === 0) return <NoResultScreen />;

  return (
    <SafeAreaView ref={scrollViewRef} style={{ flex: 1, backgroundColor: 'white', padding: 16 }}>
      <FlatList
        data={flatMap}
        renderItem={({ item }) => {
          if (!item) return null;
          return (
            <FeedItem
              key={item.id}
              insight={item}
              localId={String(userId)}
              onBookMarkClick={touchBookMark}
            />
          );
        }}
        keyExtractor={(item) => item?.id.toString() as string}
        refreshControl={
          <RefreshControl
            refreshing={feedListIsLoading}
            onRefresh={() => {
              queryClient.invalidateQueries(['search', searchText]);
            }}
          />
        }
        onEndReachedThreshold={0.5}
        onEndReached={onEndReached}
        style={{ backgroundColor: 'white' }}
      />
    </SafeAreaView>
  );
};

export default SearchInsightScreen;
