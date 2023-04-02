import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { SvgXml } from 'react-native-svg';
import { roundedMinus } from '../../../../assets/images/user/settings/folder/rounded_minus';
import { ScrollView } from 'react-native-gesture-handler';
import TwoButtonModal from '../../../components/modal/TwoButtonModal';

interface FolderEditSectionProps {
  userFolderList: FolderData[];
}

const FolderEditSection = ({ userFolderList }: FolderEditSectionProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pressedFolderId, setPressedFolderId] = useState<number | null>(null);

  const handleDeleteFolder = () => {
    if (pressedFolderId === null) return;
    alert('delete folder ' + pressedFolderId);
    setIsModalVisible(false);
  };

  const handlePressDeleteFolder = (id: number) => {
    setIsModalVisible(true);
    setPressedFolderId(id);
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
                alert('text');
              }}
              style={styles.folderTextContainer}
            >
              <Text>{folder.name}</Text>
            </Pressable>
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
