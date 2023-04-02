import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { SvgXml } from 'react-native-svg';
import { roundedMinus } from '../../../../assets/images/user/settings/folder/rounded_minus';
import { ScrollView } from 'react-native-gesture-handler';
import TwoButtonModal from '../../../components/modal/TwoButtonModal';
import BottomSheetHeader from '../../../components/header/BottomSheetHeader';
import HeaderRightButton from '../../../components/header/HeaderRightButton';
import BlandTextInput from '../../../components/texts/BlandTextInput';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';

interface FolderEditSectionProps {
  userFolderList: FolderData[];
}

const FolderEditSection = ({ userFolderList }: FolderEditSectionProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pressedFolderId, setPressedFolderId] = useState<number | null>(null);
  const [folderName, setFolderName] = useState<string>('');
  const modalRefEdit = useRef<BottomSheetModal>(null);
  const handleDeleteFolder = () => {
    if (pressedFolderId === null) return;
    alert('delete folder ' + pressedFolderId);
    setIsModalVisible(false);
  };

  const handlePressDeleteFolder = (id: number) => {
    setIsModalVisible(true);
    setPressedFolderId(id);
  };

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    [],
  );

  const handleEditFolderName = () => {
    alert(`folder Id: ${pressedFolderId}, folderName: ${folderName} `);
    // if (!folderName.length) return;
    // UploadApis.createNewFolder(folderName)
    //   .then((res) => {
    //     modalRefAdd.current?.dismiss();
    //     setFolderName('');
    //     Toast.show({
    //       type: 'snackbar',
    //       text1: '폴더를 만들었어요',
    //       position: 'bottom',
    //     });
    //     queryClient.invalidateQueries(
    //       MypageQueryKeys.getNonModifiedList({ userId: String(userId) }),
    //     );
    //   })
    //   .catch(() => {
    //     Toast.show({
    //       type: 'snackbar',
    //       text1: '폴더 생성 실패',
    //       position: 'bottom',
    //     });
    //   });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {userFolderList.map((folder) => {
        return (
          <View key={folder.id} style={styles.folderCtn}>
            <Pressable onPress={() => handlePressDeleteFolder(folder.id)}>
              <SvgXml xml={roundedMinus} />
            </Pressable>
            <Pressable
              onPress={() => {
                modalRefEdit.current?.present();
                setPressedFolderId(folder.id);
              }}
              style={styles.folderTextContainer}
            >
              <Text>{folder.name}</Text>
            </Pressable>
            <BottomSheetModal
              ref={modalRefEdit}
              snapPoints={['28%']}
              backdropComponent={renderBackdrop}
            >
              <View>
                <BottomSheetHeader
                  headerRightButton={() => (
                    <HeaderRightButton
                      backGroundColor={folderName.length ? '#b0e817' : '#12131433'}
                      textColor={folderName.length ? 'black' : 'white'}
                      borderLine={false}
                      disabled={folderName.length ? false : true}
                      text="완료"
                      handlePress={handleEditFolderName}
                    />
                  )}
                  onLeftButtonPress={() => modalRefEdit.current?.dismiss()}
                  title="폴더 이름 수정"
                  iconName="close"
                />
                <View style={{ padding: 16, paddingTop: 0 }}>
                  <BlandTextInput setTextVal={setFolderName} />
                </View>
              </View>
            </BottomSheetModal>
          </View>
        );
      })}
      <TwoButtonModal
        dismissable={true}
        visible={isModalVisible}
        onDismiss={() => setIsModalVisible(false)}
        mainTitle="폴더 삭제"
        leftButtonText="취소"
        rightButtonText="삭제하기"
        leftButtonPress={() => setIsModalVisible(false)}
        rightButtonPress={handleDeleteFolder}
      />
    </ScrollView>
  );
};

export default FolderEditSection;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  folderCtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  folderTextContainer: {
    flex: 1,
    height: 36,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1213141a',
    borderRadius: 12,
    paddingLeft: 16,
    marginLeft: 12,
  },

  deleteFolder: {},
});
