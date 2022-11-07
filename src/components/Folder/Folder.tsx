import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewProps } from 'react-native';
interface FolderProps extends ViewProps {
  text: string;
  selectedFolder: string;
  setSelectedFolder: React.Dispatch<React.SetStateAction<string>>;
  textStyle?: any;
}

const Folder = (props: FolderProps) => {
  const { text, setSelectedFolder, selectedFolder } = props;
  return (
    <View style={styles.container}>
      <Pressable onPress={() => setSelectedFolder(text)} style={props.style}>
        <Text style={{ ...styles.text, ...props.textStyle }}>{text}</Text>
      </Pressable>
      {selectedFolder === text && <AntDesign name="check" size={24} color="black" />}
    </View>
  );
};

export default Folder;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 32,
  },

  text: {
    fontSize: 16,
    color: '#121314',
    fontFamily: 'pretendard',
  },
});
