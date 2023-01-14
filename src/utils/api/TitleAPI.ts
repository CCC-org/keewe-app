import { Title } from '../../types/title/title';
import { getAccessToken } from '../hooks/asyncStorage/Login';
import axios from 'axios';

export const TitleApiKeys = {
  //TODO: func should return array of string, and user info.
  getTitleList: () => ['title', 'title'],
};

export const TitleApis = {
  getTitleList: async (userId: string | number): Promise<Title['data']> => {
    const token = await getAccessToken();
    return axios
      .get<Title>(
        'https://api-keewe.com/api/v1/user/profile/all-achieved-title/' + String(userId),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        return res.data.data;
      });
  },
};
