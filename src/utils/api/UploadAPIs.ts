import { InsightPatchRequest, UploadRequest } from '../../types/upload';
import httpClient from './BaseHttpClient';

export const UploadApis = {
  createNewFolder: async (folderName: string) => {
    return httpClient
      .post('https://api-keewe.com/api/v1/drawer', { name: folderName })
      .then((res) => {
        return res.data;
      });
  },
  uploadInsight: async (datas: UploadRequest) => {
    return httpClient.post('https://api-keewe.com/api/v1/insight', datas).then((res) => {
      return res.data;
    });
  },
  editInsight: async (datas: InsightPatchRequest) => {
    return httpClient.patch('https://api-keewe.com/api/v1/insight', datas).then((res) => {
      return res.data;
    });
  },
  getFolderList: async () => {
    return httpClient.get('https://api-keewe.com/api/v1/drawer').then((res) => {
      return res.data.data;
    });
  },
};
