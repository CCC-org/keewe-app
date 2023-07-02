import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useTheme } from 'react-native-paper';
import TwoButtonModal from '../modal/TwoButtonModal';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InsightAPI } from '../../utils/api/InsightAPI';
import { goBack, navigate, stackName, stackOptions } from '../../utils/hooks/navigaton/navigator';

interface BSMyPostOptionsProps {
  modalRef: React.RefObject<BottomSheetModalMethods>;
  commentId: number;
}

const SheetMyComment = ({ modalRef, commentId }: BSMyPostOptionsProps) => {
  const { fonts } = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: deleteComment } = useMutation(InsightAPI.deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comment']);
    },
  });

  const handleDeleteInsight = () => {
    deleteComment({ commentId });
    goBack();
    navigate(stackName(), stackOptions());
    Toast.show({
      type: 'snackbar',
      text1: '댓글을 삭제했어요.',
      position: 'bottom',
      text2: '아직 인사이트 삭제 api가 개발이안된듯',
    });
    setIsModalVisible(false);
    modalRef.current?.close();
  };

  return (
    <ScrollView style={styles.optionContainer}>
      <Pressable style={styles.option} onPress={() => setIsModalVisible(true)}>
        <Text style={[fonts.text.body1.regular]}>삭제하기</Text>
      </Pressable>
      <TwoButtonModal
        dismissable={false}
        mainTitle={'댓글을 삭제할까요?'}
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

export default SheetMyComment;

const styles = StyleSheet.create({
  optionContainer: {
    backgroundColor: 'white',
    padding: 16,
  },
  option: {
    paddingVertical: 18,
  },
});
