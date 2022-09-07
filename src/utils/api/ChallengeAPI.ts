import { getAccessToken } from '../hooks/asyncStorage/Login';
import httpClient from './BaseHttpClient';

export const ChallengeQueryKeys = {
  create: (request: ChallengeCreateRequest) => ['challenge', request],
};

export const ChallengeAPI = {
  create: async (params: ChallengeCreateRequest) => {
    const token = await getAccessToken();
    return httpClient
      .post<ChallengeCreateResponse>('https://api-keewe.com/api/v1/challenge', params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err);
      });
  },
};
