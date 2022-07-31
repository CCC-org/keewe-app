import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { LoginQueryKeys, LoginAPI } from '../../utils/api/LoginAPI';

function GetTokenScreen({ route }) {
  useQuery(LoginQueryKeys.login(route.params.params), () => LoginAPI.login(route.params.params), {
    onSuccess: (data) => {
      //access logic
    },
  });

  return <></>;
}

export default GetTokenScreen;
