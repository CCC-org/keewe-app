import { StyleSheet, Text, View, Pressable, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

interface BlackBelowButtonProps {
  isActive: boolean;
  text: string;
  onPress: () => void;
}

const BlackBelowButton = ({ isActive, onPress, text }: BlackBelowButtonProps) => {
  const theme = useTheme();

  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      keyboardVerticalOffset={250} // 기기마다 그에 맞는 높이를 적용하려면, native modules 라는 것을 써야 하는 것 같습니다. 우선은 제 휴대폰(Iphone11)에 맞춘 숫자를 넣어 두었습니다.
      style={styles.container}
    >
      <View
        style={{
          ...styles.btn,
          backgroundColor: theme.colors.graphic.black,
          opacity: isActive ? 1 : 0.2,
        }}
      >
        <Pressable hitSlop={{ bottom: 25, left: 170, right: 170, top: 25 }} onPress={onPress}>
          <Text style={styles.text}>{text}</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default BlackBelowButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btn: {
    width: 343,
    height: 56,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
    fontSize: 18,
    color: 'white',
  },
});
