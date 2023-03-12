import { getAccessToken } from '../hooks/asyncStorage/Login';
import httpClient from './BaseHttpClient';

export const postFeedBookMark = async (insightId: number) => {
  try {
    const token = await getAccessToken();
    const result = await httpClient.post(
      `https://api-keewe.com/api/v1/insight/bookmark/${insightId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    alert(error);
  }
};
