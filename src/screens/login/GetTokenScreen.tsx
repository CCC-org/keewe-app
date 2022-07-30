import React from 'react';
import { useQuery } from 'react-query';
import { kakaoLogin } from '../../utils/api/login';

function GetTokenScreen({ navigation, route }) {
  const { data, isError, status, fetchStatus } = useQuery('token', kakaoLogin(route.params.token), {
    onSuccess: () => {
      navigation.navigate('NicknameCreation');
    },
    onError: () => {
      navigation.navigate('NicknameCreation');
    },
  });
  return <></>;
}

export default GetTokenScreen;
