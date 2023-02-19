import { getAccessToken } from '../hooks/asyncStorage/Login';
import axios from 'axios';
import httpClient from './BaseHttpClient';

//import { UploadRequest } from '../../types/upload';
export const DetailedPostApi = {
  IncreaseViewCount: async (id: string) => {
    const token = await getAccessToken();
    return axios
      .post(`https://api-keewe.com/api/v1/insight/view/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data.data;
      });
  },
  BookMark: async (insightId: string | number) => {
    const token = await getAccessToken();
    try {
      const response = await httpClient.post<BookMark>(
        'https://api-keewe.com/api/v1/insight/bookmark/' + String(insightId),
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      const data = response.data.data;
      return data;
    } catch (err) {
      console.error('api error: ', err);
    }
  },
};

export interface BookMark {
  message: string;
  code: number;
  data: Data;
}

export interface Data {
  bookmark: boolean;
}
