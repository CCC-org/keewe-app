import httpClient from './BaseHttpClient';

export const FeedQueryKeys = {
  getFeed: () => ['feed'],
  getBookMarkFeed: () => ['bookmark'],
};

export const FeedAPI = {
  getFeed: async (fetchUrl: string, cursor: number, limit: number, follow: boolean) => {
    let URL;
    if (fetchUrl.includes('drawerId')) {
      URL = `${fetchUrl}&cursor=${!cursor ? '' : String(cursor)}&limit=${limit}`;
    } else {
      URL = `${fetchUrl}?cursor=${!cursor ? '' : String(cursor)}&limit=${String(
        limit,
      )}&follow=${follow}`;
    }
    console.log(URL);
    const response = await httpClient.get<FeedInsight>(URL);
    return response.data.data;
  },
  getBookMarkFeed: async (cursor: string, limit: number) => {
    const currentDate = new Date().toISOString().slice(0, 23);
    const URL = `https://api-keewe.com/api/v1/insight/bookmark?cursor=${
      !cursor ? currentDate : cursor
    }&limit=${String(limit)}`;
    console.log(URL);
    try {
      const response = await httpClient.get<FeedInsight>(URL);
      return response.data.data;
    } catch (err) {
      console.error('api error: ', err);
    }
  },
};
