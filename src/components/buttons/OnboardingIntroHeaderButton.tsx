import { View, Text } from 'react-native';
import React from 'react';
import HeaderRightButton from '../header/HeaderRightButton';

const OnboardingIntroHeaderButton = () => {
  function handlePress() {
    alert('시작하기');
  }
  return (
    <HeaderRightButton
      text="시작하기"
      backGroundColor="white"
      textColor="#12131470"
      borderLine={false}
      disabled={false}
      width={73}
      handlePress={handlePress}
    />
  );
};

export default OnboardingIntroHeaderButton;
