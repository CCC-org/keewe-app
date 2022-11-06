import axios from 'axios';
import { FeedInsight } from '../../types/Feed/Feedinsights';

export const FeedQueryKeys = {
  getFeed: () => ['feed'],
};

export const FeedAPI = {
  getFeed: async () => {
    try {
      const response = await axios.get<FeedInsight>(
        'https://run.mocky.io/v3/a17877f8-bcfc-4fa0-9373-d380585f8c57',
      );
      return response.data.data;
    } catch (err) {
      console.error('FeedAPI ERROR', err);
    }
  },
};
