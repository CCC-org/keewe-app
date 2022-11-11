import axios from 'axios';
import { UserSpecificChallenge } from '../../types/Feed/UserSpecificChallenge';
import { getAccessToken } from '../hooks/asyncStorage/Login';

export const UserSpecificChallengeQueryKeys = {
  getUserSpecificChallenge: () => ['userSpecificChallenge'],
};

export const UserSpecificChallengeAPI = {
  getUserSpecificChallenge: async () => {
    const token = await getAccessToken();
    try {
      const response = await axios.get<UserSpecificChallenge>(
        'https://api-keewe.com/api/v1/challenge/participation/my-week-progress',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('userSpeci', response);
      if (response.data.code !== 200) throw new Error(response.data.message);
      return response.data.data;
    } catch (err) {
      alert(err);
    }
  },
};
