import { getAccessToken } from '../hooks/asyncStorage/Login';
import httpClient from './BaseHttpClient';

export const FollowAPI = {
  follow: async (userId: string | number) => {
    console.log('🚀 ~ file: FollowAPI.ts:6 ~ follow: ~ userId', userId);
    const token = await getAccessToken();
    try {
      const response = await httpClient.post<Follow>(
        'https://api-keewe.com/api/v1/user/profile/follow/' + String(userId),
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      const data = response.data.data;
      console.log('🚀 ~ file: FollowAPI.ts:18 ~ follow: ~ data', data);

      return data;
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
