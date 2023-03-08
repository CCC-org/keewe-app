import axios from 'axios';
import { FeedInsight } from '../../types/Feed/Feedinsights';
import { getAccessToken } from '../hooks/asyncStorage/Login';

export const FeedQueryKeys = {
  getFeed: () => ['feed'],
};

export const FeedAPI = {
  getFeed: async (fetchUrl: string, cursor: number, limit: number, follow: boolean) => {
    let URL;
    if (fetchUrl.includes('drawerId')) {
      URL = `${fetchUrl}&cursor=${!cursor ? '' : String(cursor)}&limit=${limit}`;
    } else {
      URL = `${fetchUrl}?cursor=${!cursor ? 0 : String(cursor)}&limit=${String(
        limit,
      )}&follow=${follow}`;
    }
    console.log('URL', URL);
    const token = await getAccessToken();
    try {
      const response = await axios.get<FeedInsight>(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('🚀 ~ file: FeedAPI.ts:32 ~ getFeed: ~ response.data.data:', response.data.data);
      if (response.data.code !== 200) throw new Error(response.data.message);
      return response.data.data;
    } catch (err) {
      console.log('Feedapi.ts', err);
    }
  },
};
