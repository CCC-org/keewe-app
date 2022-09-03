import httpClient from './BaseHttpClient';

export const ChallengeQueryKeys = {
  create: (request: ChallengeCreateRequest) => ['challenge', request],
};

export const ChallengeAPI = {
  create: async (params: ChallengeCreateRequest) => {
    const { data } = await httpClient.post<ChallengeCreateResponse>(
      'https://api-keewe.com/api/v1/challenge',
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGtlZXdlLmNvbSIsInJvbGVzIjpbXSwiaWF0IjoxNjU4NTgwNzgzLCJleHAiOjE2NTg5NDA3ODN9.8OuBmD7iWMKKjnGf6mIUWCO4m1j69dNJ-d_hf6ezX6E',
        },
      },
      {
        params: params,
      },
    );
    return data;
  },
};
