import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

interface FolderOptionProps {
  title: string;
  selected: boolean;
  onPress: () => void;
}

const FolderOption = ({ title, selected, onPress }: FolderOptionProps) => {
  const theme = useTheme();
  return (
    <>
      <Pressable style={styles.pressable} onPress={onPress}>
        <Text
          style={
            selected
              ? theme.fonts.text.headline2
              : { ...theme.fonts.text.headline2, color: `${theme.colors.graphic.black}4d` }
          }
        >
          {title}
        </Text>
      </Pressable>
    </>
  );
};

export default FolderOption;

const styles = StyleSheet.create({
  pressable: {
    marginHorizontal: 12,
  },
});
