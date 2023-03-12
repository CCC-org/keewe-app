import { UserSpecificChallenge } from '../../types/Feed/UserSpecificChallenge';
import { getAccessToken } from '../hooks/asyncStorage/Login';
import httpClient from './BaseHttpClient';

export const UserSpecificChallengeQueryKeys = {
  getUserSpecificChallenge: () => ['userSpecificChallenge'],
};

export const UserSpecificChallengeAPI = {
  getUserSpecificChallenge: async () => {
    const token = await getAccessToken();
    try {
      const response = await httpClient.get<UserSpecificChallenge>(
        'https://api-keewe.com/api/v1/challenge/participation/my-week-progress',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.code !== 200) throw new Error(response.data.message);
      return response.data.data;
    } catch (err) {
      alert(err);
    }
  },
};
