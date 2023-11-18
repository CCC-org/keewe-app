import { FollowersFollowings } from '../../../types/followerList/followersfollowings';
import { getTime } from '../../helper/time/UtcTimeFormatGetter';
import { getAccessToken } from '../../hooks/asyncStorage/Login';
import httpClient from '../BaseHttpClient';

export const FollowersFollowingsKeys = {
  FollowersFollowingsKeys: () => ['followersFollowings'],
};

export const FollowersFollowingsApi = {
  getFollowersFollowings: async (searchValue: string) => {
    const token = await getAccessToken();
    const URL = 'https://api-keewe.com/api/v1/invitee';
    try {
      if (!searchValue) {
        const response = await httpClient.get<FollowersFollowings>(
          URL + '?' + `cursor=${getTime()}&limit=40`,
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
      } else {
        const response = await httpClient.get<FollowersFollowings>(
          `${URL}/search?searchWord=${searchValue}&limit=30`,
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
      }
    } catch (error) {
      console.log(error);
    }
  },
};
