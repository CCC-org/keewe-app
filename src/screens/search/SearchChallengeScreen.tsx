import { ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { SearchContext } from './SearchScreen';
import httpClient from '../../utils/api/BaseHttpClient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import CurrentChallengeProfile from '../../components/profile/ChallengeProfileCurrent';
import { ActivityIndicator } from 'react-native-paper';
import NoResultScreen from '../../components/misc/NoResultScreen';

export interface SearchChallenge {
  id: number;
  insightCnt: number;
  interestName: string;
  introduction: string;
  name: string;
}

const fetchSearchChallenges = async ({ searchText = 'test', page, limit }) => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.append('keyword', searchText);
  urlSearchParams.append('searchType', 'CHALLENGE');
  urlSearchParams.append('limit', limit.toString());
  if (page > 0) {
    urlSearchParams.append('cursor', page.toString());
  }

  const queryString = urlSearchParams.toString();
  const requestUrl = `https://api-keewe.com/api/v1/search?${queryString}`;

  try {
    const response = await httpClient.get<SearchChallenge[]>(requestUrl);
    return response.data;
  } catch (error) {
    console.error('search insight screen', error);
    throw error;
  }
};

const SearchChallengeScreen = () => {
  const { searchText } = useContext(SearchContext);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, isLoading } =
    useInfiniteQuery({
      queryKey: ['searchScreen', 'challenge', searchText],
      queryFn: ({ pageParam = 0 }) =>
        fetchSearchChallenges({ searchText, page: pageParam, limit: 10 }),
      getNextPageParam: (lastPage) => {
        return lastPage[lastPage.length - 1]?.id;
      },
    });

  const onEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<SearchChallenge>) => {
    return (
      <CurrentChallengeProfile
        key={index}
        name={item.name}
        challengeId={item.id}
        interest={item.interestName}
        challengeDescription={item.name}
        insightNumber={String(item.insightCnt)}
        participate={false}
      />
    );
  };

  if (status === 'loading') {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (status === 'error') {
    return (
      <View style={styles.centered}>
        <Text>Failed to load challenges.</Text>
      </View>
    );
  }

  const flatListData = data?.pages.flatMap((page) => page) || [];

  if (flatListData.length === 0) {
    return <NoResultScreen />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList
        data={flatListData}
        renderItem={(info) => renderItem(info)}
        keyExtractor={(item, index) => `challenge-${item.id}-${index}`}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator size="large" /> : null}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

export default SearchChallengeScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingBottom: '100%',
    marginBottom: 80,
  },
});
