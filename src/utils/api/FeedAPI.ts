import { FeedInsight } from '../../types/Feed/Feedinsights';
import { getAccessToken } from '../hooks/asyncStorage/Login';
import httpClient from './BaseHttpClient';

export const FeedQueryKeys = {
  getFeed: () => ['feed'],
  getBookMarkFeed: () => ['bookmark'],
};

export const FeedAPI = {
  getFeed: async (fetchUrl: string, cursor: number, limit: number, follow: boolean) => {
    let URL;
    if (fetchUrl.includes('drawerId')) {
      URL = `${fetchUrl}&cursor=${!cursor ? '' : String(cursor)}&limit=${limit}`;
    } else if (fetchUrl.includes('bookmark')) {
      URL = `${fetchUrl}?cursor=${!cursor ? '' : String(cursor)}&limit=${String(limit)}`;
    } else {
      URL = `${fetchUrl}?cursor=${!cursor ? '' : String(cursor)}&limit=${String(
        limit,
      )}&follow=${follow}`;
    }
    const token = await getAccessToken();
    const response = await httpClient.get<FeedInsight>(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  },
  getBookMarkFeed: async (cursor: number, limit: number) => {
    try {
      const token = await getAccessToken();
      const response = await httpClient.get<FeedInsight>(
        `https://api-keewe.com/api/v1/insight/bookmark?cursur=${
          !cursor ? '' : String(cursor)
        }&limit=${String(limit)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data.data;
    } catch (err) {
      console.error('api error: ', err);
    }
  },
};
