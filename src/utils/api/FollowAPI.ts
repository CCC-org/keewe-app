import httpClient from './BaseHttpClient';

export const FollowAPI = {
  follow: async (userId: string | number, insightId?: string) => {
    let url = 'https://api-keewe.com/api/v1/user/profile/follow/' + String(userId);
    if (insightId) url += `?insightId=${insightId}`;
    try {
      const response = await httpClient.post<Follow>(url, null);
      const data = response.data.data;
      return data;
    } catch (err) {
      console.error('api error: ', err);
    }
  },
};

export interface Follow {
  message: string;
  code: number;
  data: Data;
}

export interface Data {
  following: boolean;
}
