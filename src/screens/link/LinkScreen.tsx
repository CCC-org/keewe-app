import React from 'react';
import { Text } from 'react-native';
import MainLottie from '../../components/lotties/MainLottie';

const LinkScreen = ({ navigation, route }) => {
  return (
    <>
      <Text>{route.params.type}</Text>
      <Text>{route.params.param}</Text>
      <MainLottie />
    </>
  );
};

export default LinkScreen;
