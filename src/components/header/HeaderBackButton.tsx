import { Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { arrowLeft } from '../../constants/Icons/Navigation/ArrowLeftXml';

interface HeaderBackButtonProps {
  onPress?: () => void;
}

const HeaderBackButton = ({ onPress }: HeaderBackButtonProps) => {
  const navigation = useNavigation();

  return (
    <>
      <Pressable
        style={{ marginLeft: 18 }}
        onPress={() => {
          if (onPress) {
            onPress();
          } else {
            navigation.goBack();
          }
        }}
      >
        <SvgXml xml={arrowLeft} />
      </Pressable>
    </>
  );
};

export default HeaderBackButton;
