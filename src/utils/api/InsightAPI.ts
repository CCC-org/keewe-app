import axios from 'axios';
import { InsightProfileRequest, ProfileData } from '../../types/profile/profile';
import { getAccessToken } from '../hooks/asyncStorage/Login';
import httpClient from './BaseHttpClient';

export const InsightQueryKeys = {
  getProfile: (request: InsightProfileRequest) => ['profile', request.insightId],
};

export const InsightAPI = {
  getProfile: async (request: InsightProfileRequest) => {
    const { insightId } = request;

    try {
      const token = await getAccessToken();

      const { data } = await httpClient.get<ProfileData>(
        `https://api-keewe.com/api/v1/insight/author/${insightId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('api: ', data);
      return data;
    } catch (err) {
      console.log('api error: ', err);
    }
  },
};
