import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
import { roundedMinus } from '../../../../assets/images/user/settings/folder/rounded_minus';
import { ScrollView } from 'react-native-gesture-handler';

interface FolderEditSectionProps {
  userFolderList: FolderData[];
}

const FolderEditSection = ({ userFolderList }: FolderEditSectionProps) => {
  console.log(
    '🚀 ~ file: FolderEditSection.tsx:12 ~ FolderEditSection ~ userFolderList:',
    userFolderList,
  );

  return (
    <ScrollView>
      {userFolderList.map((folder) => {
        return (
          <View key={folder.id}>
            <Pressable onPress={() => alert('pressed')}>
              <SvgXml xml={roundedMinus} />
            </Pressable>
            <View>
              <Text>{folder.name}</Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default FolderEditSection;

const styles = StyleSheet.create({
  deleteFolder: {},
});
