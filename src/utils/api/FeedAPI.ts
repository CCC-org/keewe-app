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
    console.log('URL', URL);

    const response = await httpClient.get<FeedInsight>(URL);
    return response.data.data;
  },
  getBookMarkFeed: async (cursor: string, limit: number) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
    const URL = `https://api-keewe.com/api/v1/insight/bookmark?cursor=${
      !cursor ? formattedDate : cursor.slice(0, 23)
    }&limit=${String(limit)}`;
    try {
      const response = await httpClient.get<FeedInsight>(URL);
      return response.data.data;
    } catch (err) {
      console.error('api error: ', err);
    }
  },
};
