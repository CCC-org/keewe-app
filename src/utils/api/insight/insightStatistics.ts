import { getAccessToken } from '../../hooks/asyncStorage/Login';
import httpClient from '../BaseHttpClient';

export const insightStatisticsKeys = {
  getStatisticKey: (insightId: number | string) => ['insight', insightId, 'statistic'],
};

export const insightStatisticsApi = {
  getStatistics: async (insightId: number | string) => {
    const token = await getAccessToken();
    try {
      const res = await httpClient.get(
        `https://api-keewe.com/api/v1/insight/${insightId}/statistics`,
      );
      return res.data;
    } catch (e) {
      return null;
    }
  },
};
