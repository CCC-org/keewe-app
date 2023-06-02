import httpClient from './BaseHttpClient';

export const postFeedBookMark = async (insightId: number) => {
  try {
    const result = await httpClient.post(
      `https://api-keewe.com/api/v1/insight/bookmark/${insightId}`,
      {},
    );
    return result.data;
  } catch (error) {
    alert(error);
  }
};
