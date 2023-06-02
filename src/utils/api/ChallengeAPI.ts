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
    return httpClient
      .post<ChallengeCreateResponse>('https://api-keewe.com/api/v1/challenge', params, {})
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err);
      });
  },
  join: async (params: ChallengeJoinRequest) => {
    return httpClient
      .post<ChallengeJoinResponse>('https://api-keewe.com/api/v1/challenge/participation', params)
      .then((res) => res.data.data)
      .catch((err) => {
        throw new Error(err);
      });
  },
  getMyInterests: async () => {
    return httpClient
      .get<MyInterestsGetResponse>('https://api-keewe.com/api/v1/user/profile/interests')
      .then((res) => {
        return res.data.data;
      });
  },
  challengeJoin: async (params: ChallengeCreateRequest) => {
    return httpClient
      .post<ChallengeCreateResponse>('https://api-keewe.com/api/v1/challenge', params)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err);
      });
  },
  getParticipationCheck: async () => {
    return httpClient
      .get<ChallengeParticipationGetResponse>(
        'https://api-keewe.com/api/v1/challenge/participation/check',
      )
      .then((res) => {
        return res.data.data;
      });
  },
  getChallengeParticipation: async () => {
    return httpClient
      .get<ChallengeGetResponse>('https://api-keewe.com/api/v1/challenge/participating')
      .then((res) => {
        return res.data.data;
      });
  },
  getChallengeHistory: async (params?: ChallengeHistoryGetRequest) => {
    return httpClient
      .get<ChallengeHistoryGetResponse>('https://api-keewe.com/api/v1/challenge/finished', {
        params,
      })
      .then((res) => {
        return res.data.data;
      });
  },
  getChallengeHistoryCount: async () => {
    return httpClient
      .get<ChallengeHistoryCountGetResponse>(
        'https://api-keewe.com/api/v1/challenge/finished/count',
      )
      .then((res) => {
        return res.data.data;
      });
  },
  getChallengeCurrent: async (params: ChallengeCurrentGetRequest) => {
    return httpClient
      .get<ChallengeCurrentGetResponse>('https://api-keewe.com/api/v1/challenge', {
        params,
      })
      .then((res) => {
        return res.data.data;
      });
  },
  getChallengeProgress: async () => {
    return httpClient
      .get<ChallengeProgressGetResponse>(
        'https://api-keewe.com/api/v1/challenge/participation/progress/insight',
      )
      .then((res) => {
        return res.data.data;
      });
  },
  getChallengeDetail: async (params: ChallengeDetailGetRequest) => {
    return httpClient
      .get<ChallengeDetailGetResponse>(
        `https://api-keewe.com/api/v1/challenge/${params.challengeId}/detail`,
      )
      .then((res) => {
        return res.data.data;
      });
  },
  getChallengeMyDetail: async () => {
    return httpClient
      .get<ChallengeMyDetailGetResponse>('https://api-keewe.com/api/v1/challenge/my/detail')
      .then((res) => {
        return res.data.data;
      });
  },
  getChallengeFriends: async (params: ChallengeFriendsGetRequest) => {
    const { challengeId, ...otherParams } = params;
    return httpClient
      .get<ChallengeFriendsGetResponse>(
        `https://api-keewe.com/api/v1/challenge/${challengeId}/friends`,
        {
          params: otherParams,
        },
      )
      .then((res) => {
        return res.data.data;
      });
  },
  getChallengeFriendsCount: async (params: ChallengeFriendsCountGetRequest) => {
    return httpClient
      .get<ChallengeFriendsCountGetResponse>(
        `https://api-keewe.com/api/v1/challenge/${params.challengeId}/challengers/count`,
      )
      .then((res) => {
        return res.data.data;
      });
  },
  getChallengeStatistics: async () => {
    return httpClient
      .get<ChallengeStatisticsGetResponse>('https://api-keewe.com/api/v1/challenge/statistics')
      .then((res) => {
        return res.data.data;
      });
  },
  getChallengeInsightCount: async (params: ChallengeInsightCountGetRequest) => {
    console.log(params);
    return httpClient
      .get<ChallengeInsightCountGetResponse>(
        'https://api-keewe.com/api/v1/challenge/my/insight/count',
        {
          params,
        },
      )
      .then((res) => {
        return res.data.data;
      });
  },
};
