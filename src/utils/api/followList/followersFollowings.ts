import { FollowersFollowings } from '../../../types/followerList/followersfollowings';
import { getTime } from '../../helper/time/UtcTimeFormatGetter';
import { getAccessToken } from '../../hooks/asyncStorage/Login';
import httpClient from '../BaseHttpClient';

export const FollowersFollowingsKeys = {
  FollowersFollowingsKeys: () => ['followersFollowings'],
};

export const FollowersFollowingsApi = {
  getFollowersFollowings: async () => {
    const token = await getAccessToken();

    try {
      const response = await httpClient.get<FollowersFollowings>(
        'https://api-keewe.com/api/v1/invitee' + '?' + `cursor=${getTime()}&limit=20`,
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
      console.log(error);
    }
  },
};
