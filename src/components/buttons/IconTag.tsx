import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useTheme } from 'react-native-paper';

interface IconTagProps {
  title: string;
  isSelected: boolean;
  icon: JSX.Element;
  onClick: () => void;
}

const IconTag = ({ title, isSelected, icon, onClick }: IconTagProps) => {
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
      <Pressable style={styles.btn} onPress={onClick}>
        {icon}
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
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'solid',
    margin: 4,
  },
  btn: {
    flexDirection: 'row',
  },
});

export default IconTag;
