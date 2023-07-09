import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import BottomSheetHeader from '../../components/header/BottomSheetHeader';
import HeaderRightButton from '../../components/header/HeaderRightButton';
import Folder from '../../components/Folder/Folder';
import BlandTextInput from '../../components/texts/BlandTextInput';
import { BottomSheetScrollView, useBottomSheet } from '@gorhom/bottom-sheet';
import { backButtonModalClose } from '../../utils/helper/bottomSheetUtils/bottomSheetUtils';
import { IFolder } from '../../types/upload';

interface FolderSheetContentProps {
  onHeaderLeftPress: () => void;
  handleSheetComplete: () => void;
  setFolder: React.Dispatch<React.SetStateAction<IFolder[]>>;
  selectedFolder: string;
  setSelectedFolder: React.Dispatch<React.SetStateAction<string>>;
  folders: IFolder[];
}

const FolderSheetContent = ({
  onHeaderLeftPress,
  handleSheetComplete,
  setFolder,
  setSelectedFolder,
  folders,
  selectedFolder,
}: FolderSheetContentProps) => {
  const [createFolder, setCreateFolder] = useState(false);
  const { close } = useBottomSheet();
  backButtonModalClose(close);

  const handleNewFolder = () => {
    setCreateFolder(true);
  };

  return (
    <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
      {createFolder ? (
        <>
          <BottomSheetHeader
            onLeftButtonPress={onHeaderLeftPress}
            onPress={handleSheetComplete}
            title="새폴더 만들기"
            headerRightButton={() => (
              <HeaderRightButton
                pressableStyle={{
                  right: -10,
                }}
                text="완료"
                disabled={false}
                borderLine={false}
                backGroundColor="#b0e817"
                textColor="black"
                handlePress={handleSheetComplete}
              />
            )}
          />

          <View style={styles.newFolderContainer}>
            <BlandTextInput textVal={selectedFolder} setTextVal={setSelectedFolder} />
          </View>
        </>
      ) : (
        <>
          <Folder
            style={styles.folderContainer}
            key={0}
            text={'선택안함'}
            textStyle={{ color: '#12131450' }}
            setSelectedFolder={setSelectedFolder}
            selectedFolder={selectedFolder}
          />
          {folders.map((folder, index) => {
            return (
              <Folder
                style={styles.folderContainer}
                key={folder.id}
                text={folder.name}
                setSelectedFolder={setSelectedFolder}
                selectedFolder={selectedFolder}
              />
            );
          })}
        </>
      )}

      {!createFolder && (
        <Pressable onPress={handleNewFolder} style={{ ...styles.folderContainer }}>
          <Text style={styles.text}>새 폴더 만들기</Text>
        </Pressable>
      )}
    </BottomSheetScrollView>
  );
};

export default FolderSheetContent;

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    // BottomSheetScrollView height makes it not scrollable
    // height: '80%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  newFolderContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  newFolderText: {
    fontSize: 20,
    color: 'white',
  },
  newFolderButton: {
    width: 50,
    height: 30,
    borderRadius: 5,
    backgroundColor: '#b0e817',
    justifyContent: 'center',
    alignItems: 'center',
  },

  folderContainer: {
    height: 60,
    width: '80%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 18,
  },
  text: {
    fontSize: 16,
    color: '#486006',
    fontFamily: 'pretendard',
  },
});
