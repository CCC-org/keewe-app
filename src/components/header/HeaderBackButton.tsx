import { Pressable } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const HeaderBackButton = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <>
      <Pressable onPress={() => navigation.goBack()}>
        <Icon name="arrowleft" size={30} color={theme.colors.graphic.black} />
      </Pressable>
    </>
  );
};

export default HeaderBackButton;
