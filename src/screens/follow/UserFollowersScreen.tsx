import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FollowListSection from './FollowListSection';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FollowListApi, FollowListKeys } from '../../utils/api/followList/followList';

const UserFollowersScreen = ({ route }) => {
  const { userId } = route.params;

  const { data: followList, fetchNextPage } = useInfiniteQuery({
    queryKey: FollowListKeys.getFollowerListKeys(userId),
    queryFn: () => FollowListApi.getFollowerList(userId),
  });

  return <FollowListSection followList={followList} fetchNextPage={fetchNextPage} />;
};

export default UserFollowersScreen;

const styles = StyleSheet.create({});
