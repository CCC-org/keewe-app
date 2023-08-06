import { Pressable } from 'react-native';
import React from 'react';
import { arrowLeft } from '../../constants/Icons/Navigation/ArrowLeftXml';
import { SvgXml } from 'react-native-svg';

interface UploadHeaderBackButtonProps {
  onPress: () => void;
}

const UploadHeaderBackButton = ({ onPress }: UploadHeaderBackButtonProps) => {
  return (
    <Pressable style={{ marginLeft: 18 }} onPress={onPress}>
      <SvgXml xml={arrowLeft} />
    </Pressable>
  );
};

export default UploadHeaderBackButton;
