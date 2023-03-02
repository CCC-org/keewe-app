import { getAccessToken } from '../../../hooks/asyncStorage/Login';
import axios from 'axios';

export const UserBlockQueryKeys = {
  getFeed: () => ['block'],
};

export const UserBlockAPI = {
  userBlock: async (params: UserBlockRequest) => {
    const { targetId } = params;
    const token = await getAccessToken();
    return axios
      .post<UserBlockResponse>(`https://api-keewe.com/api/v1/user/block/${targetId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data.data;
      });
  },
};
