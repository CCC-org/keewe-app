import { Text } from 'react-native';
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
    <Button onPress={onPress} mode="contained" color={color} icon={icon}>
      <Text>{text}</Text>
    </Button>
  );
};

export default SocialLoginButton;
