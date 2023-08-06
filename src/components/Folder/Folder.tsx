import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewProps } from 'react-native';
import { useTheme } from 'react-native-paper';
interface FolderProps extends ViewProps {
  text: string;
  selectedFolder: string;
  setSelectedFolder: React.Dispatch<React.SetStateAction<string>>;
  textStyle?: any;
}

const Folder = (props: FolderProps) => {
  const { text, setSelectedFolder, selectedFolder } = props;
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Pressable onPress={() => setSelectedFolder(text)} style={props.style}>
        <Text style={{ ...theme.fonts.text.body1.regular, ...props.textStyle }}>{text}</Text>
      </Pressable>
      {selectedFolder === text && <Feather name="check" size={24} color="#486006" />}
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
});
