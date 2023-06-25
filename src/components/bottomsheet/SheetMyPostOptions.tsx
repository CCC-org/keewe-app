import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useTheme } from 'react-native-paper';
import TwoButtonModal from '../modal/TwoButtonModal';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useNavigation } from '@react-navigation/native';
import httpClient from '../../utils/api/BaseHttpClient';
import { QueryClient } from '@tanstack/react-query';
import { FeedQueryKeys } from '../../utils/api/FeedAPI';

interface BSMyPostOptionsProps {
  modalRef: React.RefObject<BottomSheetModalMethods>;
  insightId: number;
  userId: number;
  userName: string;
  nickname?: string;
  title?: string;
  image?: string;
  contents?: string;
  link?: string;
  feedListQueryClient?: QueryClient;
}

const SheetMyPostOptions = ({
  modalRef,
  userId,
  userName,
  insightId,
  nickname,
  title,
  image,
  contents,
  link,
  feedListQueryClient,
}: BSMyPostOptionsProps) => {
  const navigation = useNavigation();
  const { fonts } = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleDeleteInsight = async () => {
    const URL = `https://api-keewe.com/api/v1/insight/${insightId}`;
    try {
      await httpClient.delete(URL);
      Toast.show({
        type: 'snackbar',
        text1: '인사이트를 삭제했어요.',
        position: 'bottom',
      });
      setIsModalVisible(false);
      modalRef.current?.close();
      feedListQueryClient?.invalidateQueries(FeedQueryKeys.getFeed());
    } catch (err) {
      console.log('delete err: ', err);
    }
  };

  const handleNavigateToUploadForEdit = () => {
    navigation.navigate('Upload', {
      link,
      insight: contents,
      isEdit: true,
      insightId,
    });
    setIsModalVisible(false);
    modalRef.current?.close();
  };

  return (
    <ScrollView style={styles.optionContainer}>
      <Pressable style={styles.option} onPress={handleNavigateToUploadForEdit}>
        <Text style={[fonts.text.body1.regular]}>수정하기</Text>
      </Pressable>
      <Pressable style={styles.option} onPress={() => setIsModalVisible(true)}>
        <Text style={[fonts.text.body1.regular]}>삭제하기</Text>
      </Pressable>
      <TwoButtonModal
        dismissable={false}
        mainTitle={'인사이트를 삭제할까요?'}
        visible={isModalVisible}
        onDismiss={() => setIsModalVisible(false)}
        leftButtonText="취소"
        rightButtonText="삭제"
        leftButtonPress={() => setIsModalVisible(false)}
        rightButtonPress={handleDeleteInsight}
        rightButtonColor="#f24822"
      />
    </ScrollView>
  );
};

export default SheetMyPostOptions;

const styles = StyleSheet.create({
  optionContainer: {
    backgroundColor: 'white',
    padding: 16,
  },
  option: {
    paddingVertical: 18,
  },
});
