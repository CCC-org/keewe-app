import axios from 'axios';
import { Comments, RepresentativeCommentsRequest } from '../../types/insight/comments';
import { InsightProfileRequest, ProfileData } from '../../types/insight/profile';
import { getAccessToken } from '../hooks/asyncStorage/Login';
import httpClient from './BaseHttpClient';

export const InsightQueryKeys = {
  getProfile: (request: InsightProfileRequest) => ['profile', request.insightId],
  getRepresentativeComments: (request: RepresentativeCommentsRequest) => [
    'RepresentativeComments',
    request.insightId,
  ],
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
      console.log('api error2: ', err);
    }
  },
  getRepresentativeComments: async (request: RepresentativeCommentsRequest) => {
    const { insightId } = request;

    try {
      const token = await getAccessToken();

      const { data } = await httpClient.get<Comments>(
        `https://api-keewe.com/api/v1/comments/representative/insights/${insightId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    } catch (err) {
      console.error('api error: ', err);
    }
  },
};
