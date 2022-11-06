import axios from 'axios';
import { Comments, CommentsRequest } from '../../types/insight/comments';
import { Replies, RepliesRequest } from '../../types/insight/replies';

import { InsightProfileRequest, ProfileData } from '../../types/insight/profile';
import { getAccessToken } from '../hooks/asyncStorage/Login';
import httpClient from './BaseHttpClient';

export const InsightQueryKeys = {
  getProfile: (request: InsightProfileRequest) => ['profile', request.insightId],
  getRepresentativeComments: (request: CommentsRequest) => [
    'RepresentativeComments',
    request.insightId,
  ],
  getReplies: (request: RepliesRequest) => ['Comments', request.parentId],
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

      return data;
    } catch (err) {
      console.error('api error2: ', err);
    }
  },
  getRepresentativeComments: async (request: CommentsRequest) => {
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
  getReplies: async (request: RepliesRequest) => {
    const { parentId } = request;

    try {
      const token = await getAccessToken();

      const { data } = await httpClient.get<Replies>(
        `https://api-keewe.com/api/v1/comments/${parentId}/replies`,
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
