import React from 'react';
import { navigate } from '../../utils/hooks/navigaton/navigator';
import HeaderRightButton from '../header/HeaderRightButton';

const OnboardingIntroHeaderButton = () => {
  function handlePress() {
    navigate('Feed', {});
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
