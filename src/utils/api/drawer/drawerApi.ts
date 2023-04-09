import { getAccessToken } from '../../hooks/asyncStorage/Login';
import httpClient from '../BaseHttpClient';

export const drawerApi = {
  deleteFolder: async (drawerId: number | string) => {
    const token = await getAccessToken();

    try {
      const res = await httpClient.delete('https://api-keewe.com/api/v1/drawer/' + drawerId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  },
  editFolderName: async (drawerId: number | string, newFolderName: string) => {
    const token = await getAccessToken();

    try {
      const res = await httpClient.patch(
        'https://api-keewe.com/api/v1/drawer/' + drawerId,
        {
          name: newFolderName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return true;
    } catch (error) {
      return false;
    }
  },
};
