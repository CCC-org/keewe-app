import { UserChallengeStatus, UserSpecificChallenge } from '../../types/Feed/UserSpecificChallenge';
import httpClient from './BaseHttpClient';

export const UserSpecificChallengeQueryKeys = {
  getUserSpecificChallenge: () => ['challenge', 'userSpecificChallenge'],
  getUserChallengeStatus: () => ['userChallengeStatus'],
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
      console.log(err);
    }
  },
  getUserChallengeStatus: async () => {
    try {
      const response = await httpClient.get<UserChallengeStatus>(
        'https://api-keewe.com/api/v1/challenge/participation/progress',
      );
      if (response.data.code !== 200) throw new Error(response.data.message);
      return response.data.data;
    } catch (err) {
      console.log(err);
    }
  },
};
