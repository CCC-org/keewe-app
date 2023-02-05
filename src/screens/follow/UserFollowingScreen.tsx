import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FollowListApi, FollowListKeys } from '../../utils/api/followList/followList';
import FollowListSection from './FollowListSection';

const UserFollowingScreen = ({ route }) => {
  const { userId } = route.params;

  const { data: followList, fetchNextPage } = useInfiniteQuery({
    queryKey: FollowListKeys.getFolloweeListKeys(userId),
    queryFn: () => FollowListApi.getFolloweeList(userId),
  });
  return <FollowListSection followList={followList} fetchNextPage={fetchNextPage} />;
};

export default UserFollowingScreen;

const styles = StyleSheet.create({});
