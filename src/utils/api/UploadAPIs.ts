import { getAccessToken } from '../hooks/asyncStorage/Login';
import { InsightPatchRequest, UploadRequest } from '../../types/upload';
import httpClient from './BaseHttpClient';
export const UploadApis = {
  createNewFolder: async (folderName: string) => {
    const token = await getAccessToken();
    return httpClient
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
    return httpClient
      .post('https://api-keewe.com/api/v1/insight', datas, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data;
      });
  },
  editInsight: async (datas: InsightPatchRequest) => {
    const token = await getAccessToken();
    return httpClient
      .patch('https://api-keewe.com/api/v1/insight', datas, {
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
    return httpClient
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
