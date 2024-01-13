import { LayoutChangeEvent, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import BottomSheetHeader from '../../components/header/BottomSheetHeader';
import HeaderRightButton from '../../components/header/HeaderRightButton';
import Folder from '../../components/Folder/Folder';
import BlandTextInput from '../../components/texts/BlandTextInput';
import { useBottomSheet } from '@gorhom/bottom-sheet';
import { backButtonModalClose } from '../../utils/helper/bottomSheetUtils/bottomSheetUtils';
import { IFolder } from '../../types/upload';
import { useTheme } from 'react-native-paper';

interface FolderSheetContentProps {
  scrollViewHeight?: number;
  onHeaderLeftPress: () => void;
  handleSheetComplete: () => void;
  setFolder: React.Dispatch<React.SetStateAction<IFolder[]>>;
  selectedFolder: string;
  setSelectedFolder: React.Dispatch<React.SetStateAction<string>>;
  folders: IFolder[];
  onLayout?: (event: LayoutChangeEvent) => void;
}

const FolderSheetContent = ({
  scrollViewHeight,
  onHeaderLeftPress,
  handleSheetComplete,
  setFolder,
  setSelectedFolder,
  folders,
  selectedFolder,
  onLayout,
}: FolderSheetContentProps) => {
  const theme = useTheme();
  const [createFolder, setCreateFolder] = useState(false);
  const { close } = useBottomSheet();
  backButtonModalClose(close);

  const handleNewFolder = () => {
    setCreateFolder(true);
  };

  return createFolder ? (
    <View onLayout={onLayout}>
      <View style={{ height: 132 }}>
        <BottomSheetHeader
          onLeftButtonPress={onHeaderLeftPress}
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
      </View>
    </View>
  ) : (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={{ height: scrollViewHeight }}
    >
      <Folder
        style={styles.folderContainer}
        key={0}
        text={'선택안함'}
        textStyle={{ color: '#12131450' }}
        setSelectedFolder={setSelectedFolder}
        selectedFolder={selectedFolder}
      />
      {folders.map((folder) => {
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
      <Pressable onPress={handleNewFolder} style={{ ...styles.folderContainer, marginBottom: 50 }}>
        <Text
          style={{
            ...theme.fonts.text.body1.regular,
            color: theme.colors.brand.onprimary.container,
          }}
        >
          새 폴더 만들기
        </Text>
      </Pressable>
    </ScrollView>
  );
};

export default FolderSheetContent;

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
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
});
