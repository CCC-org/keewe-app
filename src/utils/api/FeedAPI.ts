import axios from 'axios';
import { FeedInsight } from '../../types/Feed/Feedinsights';

export const FeedQueryKeys = {
  getFeed: () => ['feed'],
};

export const FeedAPI = {
  getFeed: async () => {
    try {
      const response = await axios.get<FeedInsight>(
        'https://run.mocky.io/v3/09153a94-f032-40c8-b7cb-fecbaf047f0e',
      );
      if (response.data.code !== 200) throw new Error(response.data.message);
      return response.data.data;
    } catch (err) {
      alert(err);
    }
  },
};
