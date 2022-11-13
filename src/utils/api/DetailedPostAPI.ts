import { getAccessToken } from '../hooks/asyncStorage/Login';
import axios from 'axios';

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
};
