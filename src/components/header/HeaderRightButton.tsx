import { Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';

interface HeaderRightButtonProps {
  text: string;
  backGroundColor: string;
  textColor: string;
  borderLine: boolean;
  disabled: boolean;
  height?: number;
  width?: number;
  handlePress: () => void;
}

const HeaderRightButton = (props: HeaderRightButtonProps) => {
  const { text, backGroundColor, textColor, borderLine, disabled, handlePress, height, width } =
    props;
  return (
    <>
      <Pressable
        onPress={() => handlePress()}
        style={{
          ...styles.btn,
          padding: 0,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: backGroundColor,
          borderWidth: borderLine ? 1 : 0,
          height: height ? height : 32,
          width: width ? width : 73,
        }}
        disabled={disabled}
      >
        <Text style={{ ...styles.text, color: textColor, fontSize: 14 }}>{text}</Text>
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