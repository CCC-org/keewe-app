import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useTheme } from 'react-native-paper';
import TwoButtonModal from '../modal/TwoButtonModal';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

interface BSMyPostOptionsProps {
  modalRef: React.RefObject<BottomSheetModalMethods>;
}

const BSMyPostOptions = ({ modalRef }: BSMyPostOptionsProps) => {
  const { fonts } = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleDeleteInsight = () => {
    Toast.show({
      type: 'snackbar',
      text1: '인사이트를 삭제했어요.',
      position: 'bottom',
      text2: '아직 인사이트 삭제 api가 개발이안된듯',
    });
    setIsModalVisible(false);
    modalRef.current?.close();
  };

  return (
    <ScrollView style={styles.optionContainer}>
      <Pressable style={styles.option} onPress={() => alert('ㅅ줭')}>
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

export default BSMyPostOptions;

const styles = StyleSheet.create({
  optionContainer: {
    backgroundColor: 'white',
    padding: 16,
  },
  option: {
    paddingVertical: 18,
  },
});
