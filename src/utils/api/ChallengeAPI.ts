import { getAccessToken } from '../hooks/asyncStorage/Login';
import httpClient from './BaseHttpClient';
import axios from 'axios';

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
  participationCheck: async () => {
    const token = await getAccessToken();
    return axios
      .get('https://api-keewe.com/api/v1/challenge/participation/check', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data.data;
      });
  },
  getChallenge: async () => {
    const token = await getAccessToken();
    return axios
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
    return axios
      .get<ChallengeHistoryGetResponse>('https://api-keewe.com/api/v1/challenge/history', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      })
      .then((res) => {
        return res.data.data;
      });
  },
  getChallengeCurrent: async (params: ChallengeCurrentGetRequest) => {
    const token = await getAccessToken();
    return axios
      .get<ChallengeCurrentGetResponse>('https://api-keewe.com/api/v1/challenge/specified-size', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      })
      .then((res) => {
        return res.data.data;
      });
  },
};
