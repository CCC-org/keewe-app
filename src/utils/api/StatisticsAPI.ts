import { getAccessToken } from '../hooks/asyncStorage/Login';
import httpClient from './BaseHttpClient';

export const StatisticsQueryKeys = {
  getStatistics: (request: StatisticsRequest) => ['login', request],
};

export const StatisticsAPI = {
  getStatistics: async (params: StatisticsRequest) => {
    const token = await getAccessToken();
    const { data } = await httpClient.get<StatisticsResponse>(
      `https://api-keewe.com/api/v1/insight/${params.insightId}/statistics`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  },
};
