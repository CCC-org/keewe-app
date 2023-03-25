import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { blockApi, blockKeys } from '../../utils/api/block/block';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import BlockListSection from './BlockListSection';
import { BlockedUser } from '../../types/block/block';

const BlockedScreen = () => {
  const {
    data: blockList,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: blockKeys.getBlockListKeys(),
    queryFn: blockApi.getBlockList,
  });
  const queryClient = useQueryClient();

  const handleDeleteBlockedUser = (userId: number) => {
    blockApi.deleteBlockedUser(userId).then((res) => {
      console.log('🚀 ~ file: BlockedScreen.tsx:17 ~ blockApi.deleteBlockedUser ~ res:', res);
      if (res.code === 200) {
        Toast.show({
          type: 'snackbar',
          text1: '계정 차단을 해제했어요.',
          position: 'bottom',
        });
      } else {
        Toast.show({
          type: 'snackbar',
          text1: '계정 차단을 해제하는데 실패했어요.',
          position: 'bottom',
        });
      }
    });
  };

  const mutation = useMutation({
    mutationFn: handleDeleteBlockedUser,
    onMutate: async (userId: number) => {
      await queryClient.cancelQueries({ queryKey: blockKeys.getBlockListKeys() });

      const list = queryClient.getQueryData<BlockedUser[]>(blockKeys.getBlockListKeys());
      if (!list) {
        alert('list in BlockedScreen is undefined');
        return;
      }
      const newList = list.filter((user) => user.id !== userId);
      queryClient.setQueryData(blockKeys.getBlockListKeys(), newList);
    },
  });

  if (!blockList?.length) return <Text>There is nothing to display</Text>;
  if (isError) return <Text>Something went wrong</Text>;
  if (isLoading) return <Text>로딩중</Text>;

  return <BlockListSection blockList={blockList} mutation={mutation} />;
};

export default BlockedScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
