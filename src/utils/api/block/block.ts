import axios, { AxiosError } from 'axios';
import { BlockResponse } from '../../../types/block/block';
import { getAccessToken } from '../../hooks/asyncStorage/Login';
import httpClient from '../BaseHttpClient';

export const blockKeys = {
  getBlockListKeys: () => ['block'],
};

export const blockApi = {
  getBlockList: async () => {
    const token = await getAccessToken();

    try {
      const response = await httpClient.get<BlockResponse>(
        'https://api-keewe.com/api/v1/user/profile/my-block-list',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.code !== 200) throw new Error('get my-block-list status code is not 200');
      return response.data.data.blockedUsers;
    } catch (error) {
      console.error('blockApi getBlockUser', error);
    }
  },
  postBlockUser: async (targetId: number) => {
    const token = await getAccessToken();
    const URL = 'https://api-keewe.com/api/v1/user/profile/block/' + targetId;
    try {
      const response = await httpClient.post(URL, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.code !== 200) throw new Error('post block status code is not 200');
      return !!response.data.code;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('blockApi postBlockUser', error.response.data);
      }
      return false;
    }
  },

  deleteBlockedUser: async (targetId: number) => {
    const token = await getAccessToken();
    try {
      const res = await httpClient.delete(
        `https://api-keewe.com/api/v1/user/profile/block/${targetId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('🚀 ~ file: block.ts:56 ~ deleteBlockedUser:async ~ res:', res.data.data);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data.message;
      }
    }
  },
};
