import { getAccessToken } from '../hooks/asyncStorage/Login';
import httpClient from './BaseHttpClient';

export const ChallengeQueryKeys = {
  create: (request: ChallengeCreateRequest) => ['challenge', request],
  getMyInterests: () => ['myInterests'],
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
  getMyInterests: async () => {
    const token = await getAccessToken();
    return httpClient
      .get<MyInterestsGetResponse>('https://api-keewe.com/api/v1/user/profile/interests', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data.data;
      });
  },
  participationCheck: async () => {
    const token = await getAccessToken();
    return httpClient
      .get('https://api-keewe.com/api/v1/challenge/participation/check', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data.data;
      });
  },
  getChallengeParticipation: async () => {
    const token = await getAccessToken();
    return httpClient
      .get<ChallengeGetResponse>('https://api-keewe.com/api/v1/challenge/participating', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data.data;
      });
  },
  getChallengeHistory: async (params?: ChallengeHistoryGetRequest) => {
    const token = await getAccessToken();
    return httpClient
      .get<ChallengeHistoryGetResponse>('https://api-keewe.com/api/v1/challenge/finished', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      })
      .then((res) => {
        return res.data.data;
      });
  },
  getChallengeHistoryCount: async () => {
    const token = await getAccessToken();
    return httpClient
      .get<ChallengeHistoryCountGetResponse>(
        'https://api-keewe.com/api/v1/challenge/finished/count',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        return res.data.data;
      });
  },
  getChallengeCurrent: async (params: ChallengeCurrentGetRequest) => {
    const token = await getAccessToken();
    return httpClient
      .get<ChallengeCurrentGetResponse>('https://api-keewe.com/api/v1/challenge', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      })
      .then((res) => {
        return res.data.data;
      });
  },
  getChallengeProgress: async () => {
    const token = await getAccessToken();
    return httpClient
      .get<ChallengeProgressGetResponse>(
        'https://api-keewe.com/api/v1/challenge/participation/progress/insight',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        return res.data.data;
      });
  },
};
