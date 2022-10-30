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

    const { data } = await httpClient.get<ProfileData>(
      `https://api-keewe.com/api/v1/insight/author/${insightId}`,
    );
    return data;
  },
};
