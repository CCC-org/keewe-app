import { Notification } from '../../../types/notification/notification';
import { getAccessToken } from '../../hooks/asyncStorage/Login';
import httpClient from '../BaseHttpClient';

export const notificationKeys = {
  getNotificationList: () => ['notifications'],
};

export const notificationApi = {
  getNotificationList: async (
    cursor: number | string | undefined | null,
  ): Promise<Notification | null> => {
    const token = await getAccessToken();
    const URL = `https://api-keewe.com/api/v1/notification?limit=10${
      cursor ? '&cursor=' + cursor : ''
    }`;
    try {
      const response = await httpClient.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.code !== 200) {
        throw new Error('get notificationList error');
      }
      const data = response.data.data;
      return data;
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
      return null;
    }
  },
  patchMarkAsRead: async (id: number | string): Promise<boolean> => {
    const token = await getAccessToken();
    try {
      const response = await httpClient.patch(
        `https://api-keewe.com/api/v1/notification/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.code !== 200) {
        throw new Error('patch mark as read error');
      }
      return true;
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
      return false;
    }
  },
};
