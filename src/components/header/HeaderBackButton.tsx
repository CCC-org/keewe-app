import { Pressable } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import { arrowLeft } from '../../constants/Icons/Navigation/ArrowLeftXml';
const HeaderBackButton = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <>
      <Pressable style={{ marginLeft: 18 }} onPress={() => navigation.goBack()}>
        <SvgXml xml={arrowLeft} />
      </Pressable>
    </>
  );
};

export default HeaderBackButton;
