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
      if (response.data.code !== 200) throw new Error(response.data.message);
      return response.data.data;
    } catch (err) {
      alert(err);
    }
  },
};
