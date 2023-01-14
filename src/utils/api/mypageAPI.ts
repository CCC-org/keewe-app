import { getAccessToken } from '../hooks/asyncStorage/Login';
import httpClient from './BaseHttpClient';

export const MypageQueryKeys = {
  getProfile: (request: ProfileGetRequest) => ['profile', request.targetId],
};

export const MypageAPI = {
  getProfile: async (request: ProfileGetRequest) => {
    const { targetId } = request;
    try {
      const token = await getAccessToken();

      const { data } = await httpClient.get<ProfileGetResponse>(
        `https://api-keewe.com/api/v1/user/profile/${targetId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return data;
    } catch (err) {
      console.error('api error2: ', err);
    }
  },
};
