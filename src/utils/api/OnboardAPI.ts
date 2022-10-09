import { getAccessToken } from '../hooks/asyncStorage/Login';
import httpClient from './BaseHttpClient';

export const OnboardQueryKeys = {
  makeProfile: (request: MakeProfileRequest) => ['login', request],
};

export const OnboardAPI = {
  makeProfile: async (params: MakeProfileRequest) => {
    const token = await getAccessToken();
    const { data } = await httpClient.post<MakeProfileResponse>(
      'https://api-keewe.com/api/v1/user/profile',
      params,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  },
};
