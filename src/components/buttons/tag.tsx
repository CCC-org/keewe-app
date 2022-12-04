import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useTheme } from 'react-native-paper';

interface TagProps {
  title: string;
  isSelected: boolean;
  onClick: () => void;
}

const Tag = ({ title, isSelected, onClick }: TagProps) => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.tag,
        {
          backgroundColor: isSelected === true ? theme.colors.brand.primary.main : 'transparent',
          borderColor: `${theme.colors.graphic.black}10`,
        },
      ]}
    >
      <Pressable onPress={onClick}>
        <Text style={theme.fonts.text.body2.bold}>{title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingTop: 6,
    paddingBottom: 6,
    paddingRight: 12,
    paddingLeft: 12,
    borderRadius: 100,
    borderWidth: 1,
    borderStyle: 'solid',
    marginHorizontal: 4,
    marginVertical: 8,
  },
});

export default Tag;
