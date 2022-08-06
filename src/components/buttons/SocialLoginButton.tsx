import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';

interface SocialLoginButtonProps {
  text: string;
  icon?: string;
  color: string;
  onPress: () => void;
}

const SocialLoginButton = ({ onPress, color, icon, text }: SocialLoginButtonProps) => {
  return (
    <Button style={styles.btn} onPress={onPress} mode="contained" color={color} icon={icon}>
      <Text>{text}</Text>
    </Button>
  );
};

export default SocialLoginButton;

const styles = StyleSheet.create({
  btn: {
    borderRadius: 50,
    width: 330,
    height: 60,
    justifyContent: 'center',
  },
});
