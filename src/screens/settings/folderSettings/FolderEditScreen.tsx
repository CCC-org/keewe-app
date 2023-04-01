import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { MypageAPI, MypageQueryKeys } from '../../../utils/api/mypageAPI';
import { querySuccessError } from '../../../utils/helper/queryReponse/querySuccessError';
import { useGetUserId } from '../../../utils/hooks/useGetUserId';
import MainLottie from '../../../components/lotties/MainLottie';

const FolderEditScreen = () => {
  const userId = useGetUserId();

  const {
    data: userFolderList,
    isLoading: isUserFolderListLoading,
    ...folderListQuery
  } = useQuery(
    MypageQueryKeys.getFolderList({ userId: String(userId) }),
    () => MypageAPI.getFolderList({ userId: String(userId) }),
    querySuccessError,
  );

  if (folderListQuery.isError) return <Text>에러가 발생했습니다.</Text>;
  if (!userId && userId !== 0) return <MainLottie />;

  return (
    <ScrollView>
      <Text>{JSON.stringify(userFolderList)}</Text>
    </ScrollView>
  );
};

export default FolderEditScreen;

const styles = StyleSheet.create({});
