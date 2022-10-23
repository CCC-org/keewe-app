import { getAccessToken } from '../hooks/asyncStorage/Login';
import axios from 'axios';
//import { UploadRequest } from '../../types/upload';
export const DetailedPostApi = {
  getViews: async () => {
    const token = await getAccessToken();
    return axios
      .get('https://api-keewe.com/api/v1/drawer', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data.data;
      });
  },
};
