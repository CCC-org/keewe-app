import { Follows } from '../../../types/followerList/followers';
import { getTime } from '../../helper/time/UtcTimeFormatGetter';
import { getAccessToken } from '../../hooks/asyncStorage/Login';
import httpClient from '../BaseHttpClient';

export const FollowListKeys = {
  getFollowerListKeys: (userId: number) => ['followers', userId],
  getFolloweeListKeys: (userId: number) => ['followees', userId],
};

export const FollowListApi = {
  getFollowerList: async (userId: number) => {
    const token = await getAccessToken();
    const query = new URLSearchParams({
      limit: '10',
      cursor: getTime(),
    });
    try {
      const response = await httpClient.get<Follows>(
        'https://api-keewe.com/api/v1/user/profile/follower/' + userId + '?' + query.toString(),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.code !== 200) {
        throw new Error(response.data.message);
      }
      return response.data.data;
    } catch (error) {
      alert(error);
    }
  },
  getFolloweeList: async (userId: number) => {
    const token = await getAccessToken();
    const query = new URLSearchParams({
      limit: '10',
      cursor: getTime(),
    });
    try {
      const response = await httpClient.get<Follows>(
        'https://api-keewe.com/api/v1/user/profile/followee/' + userId + '?' + query.toString(),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.code !== 200) {
        throw new Error(response.data.message);
      }
      return response.data.data;
    } catch (error) {
      alert(error);
    }
  },
};
