import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { MypageAPI, MypageQueryKeys } from '../../../utils/api/mypageAPI';
import { querySuccessError } from '../../../utils/helper/queryReponse/querySuccessError';
import { useGetUserId } from '../../../utils/hooks/useGetUserId';
import MainLottie from '../../../components/lotties/MainLottie';
import FolderEditSection from './FolderEditSection';

const FolderEditScreen = () => {
  const userId = useGetUserId();

  const {
    data: userFolderList,
    isLoading,
    ...folderListQuery
  } = useQuery({
    queryKey: MypageQueryKeys.getNonModifiedList({ userId: String(userId) }),
    queryFn: () => MypageAPI.getFolderList({ userId: String(userId) }),
  });

  if (folderListQuery.isError) return <Text>에러가 발생했습니다.</Text>;
  if ((!userId && userId !== 0) || isLoading) return <MainLottie />;
  if (!userFolderList) return <Text>FETCHING FOLDERS UNSUCCESSFUL</Text>;

  return <FolderEditSection userFolderList={userFolderList} />;
};

export default FolderEditScreen;

const styles = StyleSheet.create({});
