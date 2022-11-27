import axios from 'axios';
import { Replies, RepliesRequest } from '../../types/insight/replies';

import { InsightProfileRequest, ProfileData } from '../../types/insight/profile';
import { getAccessToken } from '../hooks/asyncStorage/Login';
import httpClient from './BaseHttpClient';

export const InsightQueryKeys = {
  getInsight: (request: InsightGetRequest) => ['Insight', request.insightId],
  getProfile: (request: InsightProfileRequest) => ['profile', request.insightId],
  getRepresentiveCommentList: (request: RepresentiveCommentGetListRequest) => [
    'comment',
    'representive',
    request.insightId,
  ],
  getCommentList: (request: CommentGetListRequest) => [
    'comment',
    request.insightId,
    request.cursor,
    request.limit,
  ],
  getReplies: (request: RepliesRequest) => ['comment', request.parentId],
};

export const InsightAPI = {
  react: async (params: InsightReactRequest) => {
    try {
      const token = await getAccessToken();
      const { data } = await httpClient.post<InsightGetReponse>(
        'https://api-keewe.com/api/v1/reaction',
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    } catch (e) {
      console.log('api error', e);
    }
  },
  getInsight: async (request: InsightGetRequest) => {
    const { insightId } = request;
    try {
      const token = await getAccessToken();
      const { data } = await httpClient.get<InsightGetReponse>(
        `https://api-keewe.com/api/v1/insight/${insightId}`,
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
  createComment: async (params: CommentCreateRequest) => {
    const token = await getAccessToken();
    const { data } = await httpClient.post<CommentCreateResponse>(
      'https://api-keewe.com/api/v1/comments',
      params,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  },
  getRepresentiveCommentList: async (request: RepresentiveCommentGetListRequest) => {
    const { insightId } = request;

    try {
      const token = await getAccessToken();

      const { data } = await httpClient.get<RepresentiveCommentGetListResponse>(
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
  getCommentList: async (request: CommentGetListRequest) => {
    const { insightId, ...params } = request;

    try {
      const token = await getAccessToken();

      const { data } = await httpClient.get<CommentGetListResponse>(
        `https://api-keewe.com/api/v1/comments/insights/${insightId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params,
        },
      );
      return data;
    } catch (err) {
      console.error('api error: ', err);
    }
  },
  getReplies: async (request: RepliesRequest) => {
    const { parentId, ...params } = request;

    try {
      const token = await getAccessToken();

      const { data } = await httpClient.get<Replies>(
        `https://api-keewe.com/api/v1/comments/${parentId}/replies`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params,
        },
      );
      return data;
    } catch (err) {
      console.error('api error: ', err);
    }
  },
};
