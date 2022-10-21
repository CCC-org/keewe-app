import { getAccessToken } from '../hooks/asyncStorage/Login';
import axios from 'axios';
import { UploadRequest } from '../../types/upload';
export const UploadApis = {
  createNewFolder: async (folderName: string) => {
    const token = await getAccessToken();
    return axios
      .post(
        'https://api-keewe.com/api/v1/drawer',
        { name: folderName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        return res.data;
      });
  },
  uploadInsight: async (datas: UploadRequest) => {
    const token = await getAccessToken();
    console.log(datas);
    return axios
      .post('https://api-keewe.com/api/v1/insight', datas, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data;
      });
  },
  getFolderList: async () => {
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

function temp() {
  return 'temp';
}
