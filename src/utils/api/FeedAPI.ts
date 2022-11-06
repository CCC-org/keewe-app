import axios from 'axios';
import { FeedInsight } from '../../types/Feed/Feedinsights';

export const FeedQueryKeys = {
  getFeed: () => ['feed'],
};

export const FeedAPI = {
  getFeed: async () => {
    try {
      const response = await axios.get<FeedInsight>(
        'https://run.mocky.io/v3/85edf28b-8bdd-4405-a165-bb372a59c086',
      );
      return response.data.data;
    } catch (err) {
      console.error('FeedAPI ERROR', err);
    }
  },
};
