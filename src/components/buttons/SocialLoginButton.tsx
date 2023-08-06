import { Text, Pressable } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
import { useTheme } from 'react-native-paper';

interface SocialLoginButtonProps {
  text: string;
  textColor: string;
  xml?: string;
  color: string;
  onPress: () => void;
}

const SocialLoginButton = ({ onPress, textColor, color, xml, text }: SocialLoginButtonProps) => {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: 343,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: color,
      }}
    >
      {xml && <SvgXml xml={xml} style={{ marginRight: 8 }} />}
      <Text
        style={{
          ...theme.fonts.text.body1.bold,
          marginVertical: 16,
          color: textColor,
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default SocialLoginButton;
