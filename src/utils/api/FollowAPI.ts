import { getAccessToken } from '../hooks/asyncStorage/Login';
import httpClient from './BaseHttpClient';

export const FollowAPI = {
  follow: async (userId: string | number) => {
    const token = await getAccessToken();
    try {
      const response = await httpClient.post<Follow>(
        'https://api-keewe.com/api/v1/user/profile/follow' + String(userId),
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data.data.following;
    } catch (err) {
      console.error('api error: ', err);
    }
  },
};

export interface Follow {
  message: string;
  code: number;
  data: Data;
}

export interface Data {
  following: boolean;
}
