import { Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';

interface SkipButtonProps {
  text: string;
  onPress: () => void;
}

const SkipButton = ({ onPress, text }: SkipButtonProps) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default SkipButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 30,
    borderWidth: 1,
    borderRadius: 50,
    marginRight: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
  },
});
