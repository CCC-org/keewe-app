import httpClient from './BaseHttpClient';

export const LoginQueryKeys = {
  login: (request: LoginRequest) => ['login', request],
};

export const LoginAPI = {
  login: async (params: LoginRequest) => {
    const { code, state, oauth } = params;
    const { data } = await httpClient.get<LoginResponse>(
      `https://api-keewe.com/api/v1/user/${oauth}`,
      { params: { code: decodeURIComponent(code || ''), state } },
    );
    return data;
  },
};
