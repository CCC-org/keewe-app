import { getAccessToken } from '../hooks/asyncStorage/Login';
import httpClient from './BaseHttpClient';

export const ChallengeQueryKeys = {
  create: (request: ChallengeCreateRequest) => ['challenge', request],
  getChallengeDetail: (request: ChallengeDetailGetRequest) => ['challenge', 'detail', request],
  getChallengeMyDetail: () => ['challenge', 'my', 'detail'],
  getChallengeFriendsCount: (request: ChallengeFriendsCountGetRequest) => [
    'challenge',
    'count',
    'friends',
    request,
  ],
  getChallengeFriends: (request: ChallengeFriendsGetRequest) => [
    'challenge',
    'list',
    'friends',
    request.page,
  ],
  getMyInterests: () => ['myInterests'],
  getChallengeStatistics: () => ['challenge', 'statistics'],
  getChallengeInsightCount: (request: ChallengeInsightCountGetRequest) => [
    'challenge',
    'count',
    request,
  ],
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
  join: async (params: ChallengeJoinRequest) => {
    const token = await getAccessToken();
    return httpClient
      .post<ChallengeJoinResponse>('https://api-keewe.com/api/v1/challenge/participation', params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data.data)
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
  challengeJoin: async (params: ChallengeCreateRequest) => {
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
  getParticipationCheck: async () => {
    const token = await getAccessToken();
    return httpClient
      .get<ChallengeParticipationGetResponse>(
        'https://api-keewe.com/api/v1/challenge/participation/check',
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
  getChallengeDetail: async (params: ChallengeDetailGetRequest) => {
    const token = await getAccessToken();
    return httpClient
      .get<ChallengeDetailGetResponse>(
        `https://api-keewe.com/api/v1/challenge/${params.challengeId}/detail`,
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
  getChallengeMyDetail: async () => {
    const token = await getAccessToken();
    return httpClient
      .get<ChallengeMyDetailGetResponse>('https://api-keewe.com/api/v1/challenge/my/detail', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data.data;
      });
  },
  getChallengeFriends: async (params: ChallengeFriendsGetRequest) => {
    const token = await getAccessToken();
    const { challengeId, ...otherParams } = params;
    return httpClient
      .get<ChallengeFriendsGetResponse>(
        `https://api-keewe.com/api/v1/challenge/${challengeId}/friends`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: otherParams,
        },
      )
      .then((res) => {
        return res.data.data;
      });
  },
  getChallengeFriendsCount: async (params: ChallengeFriendsCountGetRequest) => {
    const token = await getAccessToken();
    return httpClient
      .get<ChallengeFriendsCountGetResponse>(
        `https://api-keewe.com/api/v1/challenge/${params.challengeId}/challengers/count`,
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
  getChallengeStatistics: async () => {
    const token = await getAccessToken();
    return httpClient
      .get<ChallengeStatisticsGetResponse>('https://api-keewe.com/api/v1/challenge/statistics', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data.data;
      });
  },
  getChallengeInsightCount: async (params: ChallengeInsightCountGetRequest) => {
    const token = await getAccessToken();
    console.log(params);
    return httpClient
      .get<ChallengeInsightCountGetResponse>(
        'https://api-keewe.com/api/v1/challenge/my/insight/count',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params,
        },
      )
      .then((res) => {
        return res.data.data;
      });
  },
};
