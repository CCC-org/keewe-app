import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import FollowListSection from '../follow/FollowListSection';
import { InfiniteData, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import httpClient from '../../utils/api/BaseHttpClient';
import { FollowListKeys } from '../../utils/api/followList/followList';
import { FollowAPI } from '../../utils/api/FollowAPI';
import { useGetUserId } from '../../utils/hooks/useGetUserId';
import { SearchContext } from './SearchScreen'; // Import SearchContext
import { FlatList } from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import FollowListFollowButton from '../follow/FollowListFollowButton';
import ProfileAvatar from '../../components/profile/ProfileAvatar';
import NoResultScreen from '../../components/misc/NoResultScreen';

export interface SearchUser {
  id: number;
  nickname: string;
  imageURL: string;
  title: string;
  follow: boolean;
}

const fetchSearchUser = async (searchText: string, page: number) => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.append('keyword', searchText);
  urlSearchParams.append('searchType', 'USER');
  urlSearchParams.append('limit', '10');
  if (page) {
    urlSearchParams.append('page', page.toString());
  }

  const queryString = urlSearchParams.toString();
  const requestUrl = `https://api-keewe.com/api/v1/search?${queryString}`;

  try {
    const response = await httpClient.get<SearchUser[]>(requestUrl);

    return response.data;
  } catch (error) {
    console.error('search user screen', error);
    throw error;
  }
};

const SearchUserScreen = () => {
  const { searchText } = React.useContext(SearchContext);
  const userId = useGetUserId();
  const queryClient = useQueryClient();

  const userInfiniteQueryResult = useInfiniteQuery({
    queryKey: ['search', 'user', searchText],
    queryFn: ({ pageParam = 0 }) => fetchSearchUser(searchText, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const lastPageId = lastPage[lastPage.length - 1]?.id;
      if (lastPageId === undefined || lastPageId === null) return undefined;
      const previousPage = allPages[allPages.length - 1];
      const previousPageId = previousPage[previousPage.length - 1]?.id;
      if (lastPageId === previousPageId) {
        return undefined;
      }

      return lastPage[lastPage.length - 1]?.id;
    },
  });

  const mutation = useMutation({
    mutationFn: FollowAPI.follow,
    onMutate: async (followId: string | number) => {
      await queryClient.cancelQueries(['search', 'user', searchText]);

      const previousData = queryClient.getQueryData<InfiniteData<SearchUser[]>>([
        'search',
        'user',
        searchText,
      ]);

      if (previousData) {
        const updatedPages = previousData.pages.map((page) =>
          page.map((user) => (user.id === followId ? { ...user, follow: !user.follow } : user)),
        );

        queryClient.setQueryData(['search', 'user', searchText], {
          ...previousData,
          pages: updatedPages,
        });
      }

      return { previousData };
    },
    onError: (err, newFollowId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['search', 'user', searchText], context.previousData);
      }
    },
  });

  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <Pressable onPress={() => handleGoToProfileOnImagePress(item.id)}>
          <View style={styles.profile}>
            <>
              <ProfileAvatar image={item?.imageURL} size={48} />
              <View
                style={{
                  marginLeft: 12,
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-start',
                }}
              >
                <Text style={[theme.fonts.text.body1.bold]}>{item?.nickname}</Text>
                <Text style={[theme.fonts.text.body2.regular, { color: '#12131480' }]}>
                  {item?.title || 'NO TITLE'}
                </Text>
              </View>
            </>
          </View>
        </Pressable>
        {item.id !== userId && (
          <FollowListFollowButton
            onPress={() => handlePressForFollow(item.id)}
            isFollowing={item.follow}
          />
        )}
      </View>
    );
  };

  const handlePressForFollow = (id: string | number) => {
    mutation.mutate(id);
  };

  const handleGoToProfileOnImagePress = (userId) => {
    navigation.navigate('Profile', { userId } as any);
  };

  const theme = useTheme();
  const navigation = useNavigation();

  const flatData = useMemo(() => {
    return userInfiniteQueryResult.data?.pages?.flatMap((page) => page) || [];
  }, [userInfiniteQueryResult.data]);

  if (!flatData.length) {
    return <NoResultScreen />;
  }

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: 'white' }}
      data={flatData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={() => userInfiniteQueryResult.fetchNextPage()}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SearchUserScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
