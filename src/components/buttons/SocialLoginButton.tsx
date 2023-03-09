import { Text, Pressable } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';

interface SocialLoginButtonProps {
  text: string;
  textColor: string;
  xml?: string;
  color: string;
  onPress: () => void;
}

const SocialLoginButton = ({ onPress, textColor, color, xml, text }: SocialLoginButtonProps) => {
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
          fontFamily: 'pretendardSemiBold',
          fontSize: 16,
          marginVertical: 16,
          lineHeight: 24,
          color: textColor,
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default SocialLoginButton;
