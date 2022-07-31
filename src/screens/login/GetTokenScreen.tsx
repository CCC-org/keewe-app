import React from 'react';
import { useQuery } from 'react-query';
import { LoginQueryKeys, LoginAPI } from '../../utils/api/LoginAPI';
import { getAccessToken, setAccessToken } from '../../utils/hooks/asyncStorage/Login';

function GetTokenScreen({ navigation, route }) {
  useQuery(LoginQueryKeys.login(route.params.params), () => LoginAPI.login(route.params.params), {
    onSuccess: (response) => {
      setAccessToken(response.data.accessToken);
      navigation.navigate('NicknameCreation');
    },
    onError: (e) => {
      alert('인증에 실패했습니다.');
      navigation.navigate('SignUp');
    },
  });
  return <></>;
}

export default GetTokenScreen;
