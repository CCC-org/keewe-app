import httpClient from './BaseHttpClient';

export const DetailedPostApi = {
  IncreaseViewCount: async (id: string) => {
    return httpClient.post(`https://api-keewe.com/api/v1/insight/view/${id}`, null).then((res) => {
      return res.data.data;
    });
  },
  BookMark: async (insightId: string | number) => {
    try {
      const response = await httpClient.post<BookMark>(
        'https://api-keewe.com/api/v1/insight/bookmark/' + String(insightId),
        {},
      );
      const data = response.data.data;
      return data;
    } catch (err) {
      console.error('api error: ', err);
    }
  },
};

export interface BookMark {
  message: string;
  code: number;
  data: Data;
}

export interface Data {
  bookmark: boolean;
}
