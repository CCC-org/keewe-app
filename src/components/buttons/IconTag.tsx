import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useTheme } from 'react-native-paper';

interface IconTagProps {
  title: string;
  isSelected: boolean;
  icon?: JSX.Element;
  backgroundColor: string | undefined;
  onClick: () => void;
}

const IconTag = ({ title, isSelected, icon, backgroundColor, onClick }: IconTagProps) => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.tag,
        {
          backgroundColor: isSelected === true ? backgroundColor : 'transparent',
          borderColor: `${theme.colors.graphic.black}10`,
        },
      ]}
    >
      <Pressable style={styles.btn} onPress={onClick}>
        {icon}
        <Text
          style={{
            ...theme.fonts.text.body2.bold,
            marginLeft: 5,
            color: isSelected === true ? 'white' : '#121314',
          }}
        >
          {title}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    marginHorizontal: 4,
    marginVertical: 8,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default IconTag;
