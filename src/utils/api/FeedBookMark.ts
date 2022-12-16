import axios from 'axios';
import { getAccessToken } from '../hooks/asyncStorage/Login';
import httpClient from './BaseHttpClient';

export const postFeedBookMark = async (insightId: number) => {
  const token = await getAccessToken();
  console.log('🚀 ~ file: FeedBookMark.ts:7 ~ postFeedBookMark ~ token', token);
  const result = await axios.post(
    `https://api-keewe.com/api/v1/insight/bookmark/${insightId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
