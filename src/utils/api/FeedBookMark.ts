import axios from 'axios';
import { getAccessToken } from '../hooks/asyncStorage/Login';
import httpClient from './BaseHttpClient';

export const postFeedBookMark = async (insightId: number) => {
  console.log('🚀 ~ file: FeedBookMark.ts ~ line 5 ~ postFeedBookMark ~ insightId', insightId);
  const token = await getAccessToken();
  const result = await axios.post(`https://api-keewe.com/api/v1/insight/bookmark/${insightId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log('🚀 ~ file: FeedBookMark.ts ~ line 5 ~ postFeedBookMar ~ result', result);
};
