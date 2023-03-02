import axios from 'axios';

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
  getReplies: (request: ReplyGetListRequest) => [
    'comment',
    request.parentId,
    request.cursor,
    request.limit,
  ],
  getChallengeRecord: (request: ChallengeRecordRequest) => ['insight', request.insightId],
};

export const InsightAPI = {
  react: async (params: InsightReactRequest) => {
    try {
      const token = await getAccessToken();
      const { data } = await httpClient.post<InsightReactResponse>(
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
  getReplies: async (request: ReplyGetListRequest) => {
    const { parentId, ...params } = request;

    try {
      const token = await getAccessToken();
      const { data } = await httpClient.get<ReplyGetListResponse>(
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
  getChallengeRecord: async (request: ChallengeRecordRequest) => {
    const { insightId } = request;

    try {
      const token = await getAccessToken();
      const { data } = await httpClient.get<ChallengeRecordResponse>(
        `https://api-keewe.com/api/v1/insight/${insightId}/challenge-record`,
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
  insightReport: async (params: InsightReportRequest) => {
    const token = await getAccessToken();
    const { data } = await httpClient.post<InsightReportResponse>(
      'https://api-keewe.com/api/v1/report/insight',
      params,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  },
};
