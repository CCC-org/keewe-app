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
  console.log('Request URL:', requestUrl); // Debugging: Log the full request URL

  try {
    const response = await httpClient.get<SearchUser[]>(requestUrl);
    return response.data;
  } catch (error) {
    console.error('search user screen', error);
    throw error;
  }
};

const SearchUserScreen = () => {
  const { searchText } = React.useContext(SearchContext); // Use SearchContext to get the searchText
  const userId = useGetUserId();
  const queryClient = useQueryClient();

  const userInfiniteQueryResult = useInfiniteQuery({
    queryKey: ['search', 'user', searchText], // Include searchText in the query key
    queryFn: ({ pageParam = 0 }) => fetchSearchUser(searchText, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage[lastPage.length - 1]?.id;
    },
  });

  const mutation = useMutation({
    mutationFn: FollowAPI.follow,
    onMutate: async (followId: string | number) => {
      await queryClient.cancelQueries(FollowListKeys.getFolloweeListKeys(Number(userId)));

      const previousPages = queryClient.getQueryData<InfiniteData<SearchUser[]>>(
        FollowListKeys.getFolloweeListKeys(Number(userId)),
      );

      return { previousPages };
    },
    onError: (err, newFollowId, context) => {
      if (context?.previousPages) {
        queryClient.setQueryData(
          FollowListKeys.getFolloweeListKeys(Number(userId)),
          context.previousPages,
        );
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

  const handlePressForFollow = (id) => {
    // Call the mutation to follow/unfollow the user
    mutation.mutate(id);
  };

  const handleGoToProfileOnImagePress = (userId) => {
    // Navigate to the user's profile
    navigation.navigate('UserProfile', { userId });
  };

  const theme = useTheme();
  const navigation = useNavigation();

  // Flatten the pages of data into a single array
  const flatData = useMemo(() => {
    return userInfiniteQueryResult.data?.pages.flatMap((page) => page) || [];
  }, [userInfiniteQueryResult.data]);

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
