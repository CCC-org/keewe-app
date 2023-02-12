import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { InfiniteData, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FollowListApi, FollowListKeys } from '../../utils/api/followList/followList';
import FollowListSection from './FollowListSection';
import { FollowAPI } from '../../utils/api/FollowAPI';
import { Follows } from '../../types/followerList/followers';

const UserFolloweeScreen = ({ route }) => {
  const { userId } = route.params;
  const queryClient = useQueryClient();

  const { data: followList, fetchNextPage } = useInfiniteQuery({
    queryKey: FollowListKeys.getFolloweeListKeys(userId),
    queryFn: () => FollowListApi.getFolloweeList(userId),
  });

  const mutation = useMutation({
    mutationFn: (followId: string | number) => {
      return FollowAPI.follow(followId);
    },
    onMutate: (followId: string | number) => {
      const prev = queryClient.getQueryData<InfiniteData<Follows['data']>>(
        FollowListKeys.getFolloweeListKeys(userId),
      );
      if (!prev) return;
      for (const page of prev.pages) {
        for (const user of page.users) {
          if (user.id === followId) {
            user.follow = !user.follow;
          }
        }
      }
      queryClient.setQueryData(FollowListKeys.getFolloweeListKeys(userId), prev);
    },
  });
  return (
    <>
      <FollowListSection
        mutation={mutation}
        followList={followList}
        fetchNextPage={fetchNextPage}
      />
    </>
  );
};

export default UserFolloweeScreen;

const styles = StyleSheet.create({});
