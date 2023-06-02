import { Title } from '../../types/title/title';
import httpClient from './BaseHttpClient';

export const TitleApiKeys = {
  //TODO: func should return array of string, and user info.
  getTitleList: () => ['title', 'title'],
};

export const TitleApis = {
  getTitleList: async (userId: string | number): Promise<Title['data']> => {
    return httpClient
      .get<Title['data']>(
        'https://api-keewe.com/api/v1/user/profile/all-achieved-title/' + String(userId),
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log('getTitleList err: ', err);
        return {} as Title['data'];
      });
  },
};
