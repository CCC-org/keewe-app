import { UserSpecificChallenge } from '../../types/Feed/UserSpecificChallenge';
import httpClient from './BaseHttpClient';

export const UserSpecificChallengeQueryKeys = {
  getUserSpecificChallenge: () => ['userSpecificChallenge'],
};

export const UserSpecificChallengeAPI = {
  getUserSpecificChallenge: async () => {
    try {
      const response = await httpClient.get<UserSpecificChallenge>(
        'https://api-keewe.com/api/v1/challenge/participation/my-week-progress',
      );
      if (response.data.code !== 200) throw new Error(response.data.message);
      return response.data.data;
    } catch (err) {
      alert(err);
    }
  },
};
