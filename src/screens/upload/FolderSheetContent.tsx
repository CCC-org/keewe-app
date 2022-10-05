import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import BottomSheetHeader from '../../components/header/BottomSheetHeader';
import HeaderRightButton from '../../components/header/HeaderRightButton';
import Folder from '../../components/Folder/Folder';
import BlandTextInput from '../../components/texts/BlandTextInput';
import { useBottomSheet } from '@gorhom/bottom-sheet';
import { backButtonModalClose } from '../../utils/helper/bottomSheetUtils/bottomSheetUtils';

interface FolderSheetContentProps {
  onHeaderLeftPress: () => void;
  handleSheetComplete: () => void;
  setFolder: React.Dispatch<React.SetStateAction<string[]>>;
  selectedFolder: string;
  setSelectedFolder: React.Dispatch<React.SetStateAction<string>>;
  folder: string[];
}

const FolderSheetContent = ({
  onHeaderLeftPress,
  handleSheetComplete,
  setFolder,
  setSelectedFolder,
  folder,
  selectedFolder,
}: FolderSheetContentProps) => {
  const [createFolder, setCreateFolder] = useState(false);
  const { close } = useBottomSheet();
  backButtonModalClose(close);
  useEffect(() => {
    setFolder(['선택안함', ...folder]);
  }, []);

  const handleNewFolder = () => {
    setCreateFolder(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {createFolder && (
        <BottomSheetHeader
          onLeftButtonPress={onHeaderLeftPress}
          onPress={handleSheetComplete}
          title="새폴더 만들기"
          headerRightButton={() => (
            <HeaderRightButton
              text="완료"
              disabled={false}
              borderLine={false}
              backGroundColor="#b0e817"
              textColor="black"
              handlePress={handleSheetComplete}
            />
          )}
        />
      )}
      {!createFolder ? (
        Array.from(new Set(folder)).map((tag, index) => {
          return (
            <Folder
              style={styles.folderContainer}
              key={index}
              text={tag}
              textStyle={index === 0 ? { color: '#12131450' } : {}}
              setSelectedFolder={setSelectedFolder}
              selectedFolder={selectedFolder}
            />
          );
        })
      ) : (
        <View style={styles.newFolderContainer}>
          <BlandTextInput textVal={selectedFolder} setTextVal={setSelectedFolder} />
        </View>
      )}

      {!createFolder && (
        <Pressable onPress={handleNewFolder} style={{ ...styles.folderContainer }}>
          <Text style={styles.text}>새 폴더 만들기</Text>
        </Pressable>
      )}
    </ScrollView>
  );
};

export default FolderSheetContent;

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    height: '80%',
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
