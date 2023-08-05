import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from 'react-native-paper';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import TwoButtonModal from '../modal/TwoButtonModal';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { blockApi } from '../../utils/api/block/block';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import ShareOptions from './ShareOptions';

interface ProfileProps {
  modalRef: React.RefObject<BottomSheetModalMethods>;
  userId: number;
  userName: string;
  isSelf: boolean;
}

const ProfileOptions = ({ modalRef, userId, userName, isSelf }: ProfileProps) => {
  const { fonts } = useTheme();
  const [isShare, setIsShare] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const styles = createStyles(fonts);

  const navigation = useNavigation();

  const { mutate: handleBlockUser } = useMutation(blockApi.postBlockUser, {
    onSuccess: () => {
      Toast.show({
        type: 'snackbar',
        text1: '사용자를 차단했어요.',
        position: 'bottom',
      });
      modalRef.current?.close();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Tabs' }],
      });
    },
  });

  if (isShare) {
    return (
      <ShareOptions
        type={'profile'}
        id={userId}
        message={`Keewe에서 ${userName}님의 프로필 보기`}
      />
    );
  }

  return (
    <ScrollView style={styles.optionContainer}>
      <Pressable
        style={styles.option}
        onPress={() => {
          modalRef.current?.snapToIndex(1);
          setIsShare(true);
        }}
      >
        <Text style={[fonts.text.body1.regular]}>프로필 공유하기</Text>
      </Pressable>
      {!isSelf && (
        <>
          <Pressable
            style={styles.option}
            onPress={() => {
              setIsModalVisible(true);
            }}
          >
            <Text style={[fonts.text.body1.regular]}>사용자 차단하기</Text>
          </Pressable>
          <TwoButtonModal
            dismissable={false}
            mainTitle={`${userName}님을 차단할까요?`}
            subTitle="서로에게 남긴 댓글과 반응이 모두 삭제되며 복구가 불가능해요. 서로의 댓글, 기록, 프로필을 볼 수 없어요."
            visible={isModalVisible}
            onDismiss={() => setIsModalVisible(false)}
            leftButtonText="취소"
            rightButtonText="차단"
            leftButtonPress={() => setIsModalVisible(false)}
            rightButtonPress={() => handleBlockUser(userId)}
            rightButtonColor="#f24822"
          />
        </>
      )}
    </ScrollView>
  );
};

export default ProfileOptions;

function createStyles(fonts: ReactNativePaper.ThemeFonts) {
  const styles = StyleSheet.create({
    contentContainer: {
      width: '100%',
      height: '80%',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    optionContainer: {
      backgroundColor: 'white',
      padding: 16,
    },
    option: {
      paddingVertical: 18,
    },
    clickableOption: {
      paddingVertical: 18,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    header: {
      ...fonts.text.headline1,
      marginBottom: 24,
    },
    optionTitle: {
      ...fonts.text.body1.regular,
    },
  });
  return styles;
}
