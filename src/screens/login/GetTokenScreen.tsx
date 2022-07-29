import React from 'react';
import { useQuery } from 'react-query';
import { kakaoLogin } from '../../utils/api/login';

function GetTokenScreen({ navigation, route }) {
  const { data, isError, status, fetchStatus } = useQuery('token', kakaoLogin(route.params.token), {
    onSuccess: () => {
      alert('hihi');
      navigation.navigate('NicknameCreation');
    },
    onError: () => {
      alert('fu');
      navigation.navigate('NicknameCreation');
    },
  });
  alert(status);
  alert(fetchStatus);
  return <></>;
}

export default GetTokenScreen;
