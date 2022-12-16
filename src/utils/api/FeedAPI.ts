import axios from 'axios';
import { FeedInsight } from '../../types/Feed/Feedinsights';
import { getAccessToken } from '../hooks/asyncStorage/Login';

export const FeedQueryKeys = {
  getFeed: () => ['feed'],
};

export const FeedAPI = {
  getFeed: async (cursor: number, limit: number, follow: boolean) => {
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

      return response.data.data;
    } catch (err) {
      alert(err);
    }
  },
};
