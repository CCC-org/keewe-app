import { Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';

interface HeaderRightButtonProps {
  text: string;
  backGroundColor: string;
  textColor: string;
  borderLine: boolean;
  disabled: boolean;
  handlePress: () => void;
}

const HeaderRightButton = (props: HeaderRightButtonProps) => {
  const { text, backGroundColor, textColor, borderLine, disabled, handlePress } = props;
  return (
    <>
      <Pressable
        onPress={() => handlePress()}
        style={{
          ...styles.btn,
          backgroundColor: backGroundColor,
          borderWidth: borderLine ? 1 : 0,
        }}
        disabled={disabled}
      >
        <Text style={{ ...styles.text, color: textColor }}>{text}</Text>
      </Pressable>
    </>
  );
};

export default HeaderRightButton;

const styles = StyleSheet.create({
  btn: {
    padding: 10,
    borderRadius: 30,
    borderColor: 'black',
  },
  text: {
    fontWeight: '600',
  },
});
