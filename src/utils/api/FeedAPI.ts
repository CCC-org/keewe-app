import axios from 'axios';
import { FeedInsight } from '../../types/Feed/Feedinsights';
import { getAccessToken } from '../hooks/asyncStorage/Login';

export const FeedQueryKeys = {
  getFeed: () => ['feed'],
};

export const FeedAPI = {
  getFeed: async (cursor: number, limit: number, follow: boolean) => {
    console.log('🚀 ~ file: FeedAPI.ts:11 ~ getFeed: ~ follow', follow);
    console.log('🚀 ~ file: FeedAPI.ts:11 ~ getFeed: ~ limit', limit);
    console.log('🚀 ~ file: FeedAPI.ts:11 ~ getFeed: ~ cursor', cursor);
    const token = await getAccessToken();
    try {
      const response = await axios.get<FeedInsight>(
        `https://api-keewe.com/api/v1/insight?cursor=${
          !cursor ? '' : String(cursor)
        }&limit=${String(limit)}&follow=${follow}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.code !== 200) throw new Error(response.data.message);
      console.log('🚀 ~ file: FeedAPI.ts:24 ~ getFeed: ~ response', response.data);

      return response.data.data;
    } catch (err) {
      alert(err);
    }
  },
};
