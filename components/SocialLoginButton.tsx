import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';

interface SocialLoginButtonProps {
  text: string;
  icon?: string;
  color: string;
  handlePress: () => void;
}

const SocialLoginButton = ({ handlePress, color, icon, text }: SocialLoginButtonProps) => {
  return (
    <Button onPress={handlePress} mode="contained" color={color} icon={icon}>
      <Text>{text}</Text>
    </Button>
  );
};

export default SocialLoginButton;
