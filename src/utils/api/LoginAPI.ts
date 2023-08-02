import axios from 'axios';
import httpClient from './BaseHttpClient';

export const LoginQueryKeys = {
  login: (request: LoginRequest) => ['login', request],
};

export const LoginAPI = {
  login: async (params: LoginRequest) => {
    const { code, state, oauth } = params;
    try {
      const { data } = await axios.get<LoginResponse>(
        `https://api-keewe.com/api/v1/user/${oauth}`,
        { params: { code: decodeURIComponent(code || ''), state } },
      );
      return data;
    } catch {
      alert('로그인 실패');
    }
  },
  tokenPush: async (params: TokenPushRequest) => {
    try {
      const { data } = await httpClient.put(
        'https://api-keewe.com/api/v1/user/token/push',
        params,
        {},
      );
      return data;
    } catch (e) {
      throw new Error('탈퇴 실패');
    }
  },
  withdraw: async () => {
    try {
      const { data } = await httpClient.put('https://api-keewe.com/api/v1/user/withdraw', null, {});
      return data;
    } catch (e) {
      throw new Error('탈퇴 실패');
    }
  },
};
