import httpClient from './BaseHttpClient';

export const OnboardQueryKeys = {
  makeProfile: (request: MakeProfileRequest) => ['login', request],
};

export const OnboardAPI = {
  makeProfile: async (params: MakeProfileRequest) => {
    const { data } = await httpClient.post<MakeProfileResponse>(
      'https://api-keewe.com/api/v1/user/profile',
      params,
    );
    return data;
  },
};
