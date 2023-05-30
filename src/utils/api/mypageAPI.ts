import { AxiosError } from 'axios';
import { getAccessToken } from '../hooks/asyncStorage/Login';
import httpClient from './BaseHttpClient';

export const MypageQueryKeys = {
  getProfile: (request: ProfileGetRequest) => {
    return ['profile', request.targetId];
  },
  getRepresentativeTitles: (request: RepresentativeTitlesGetRequest) => [
    'representativeTitles',
    request.userId,
  ],
  getNonModifiedList: (request: UserFolderListGetRequest) => [
    'folderList',
    'nonModified',
    request.userId,
  ],
  getFolderList: (request: UserFolderListGetRequest) => ['folderList', request.userId],
  getFolderInsight: (drawerId: number | string, userId: number | string) => [
    'profile',
    'insight',
    drawerId,
    userId,
  ],
};

export const MypageAPI = {
  getProfile: async (request: ProfileGetRequest) => {
    const { targetId } = request;
    try {
      const token = await getAccessToken();

      const { data } = await httpClient.get<ProfileGetResponse>(
        `https://api-keewe.com/api/v1/user/profile/${targetId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    } catch (err) {
      console.error('api error2: ', err);
    }
  },
  getRepresentativeTitles: async (request: RepresentativeTitlesGetRequest) => {
    const { userId } = request;
    try {
      const token = await getAccessToken();

      const { data } = await httpClient.get<RepresentativeTitlesGetResponse>(
        `https://api-keewe.com/api/v1/user/profile/achieved-title/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return data;
    } catch (err) {
      console.error('api error2: ', err);
    }
  },
  getFolderList: async (request: UserFolderListGetRequest) => {
    const { userId } = request;
    if (userId === 'undefined') return null;
    if (!userId) return null;
    try {
      const token = await getAccessToken();
      const response = await httpClient.get<UserFolderListGetResponse>(
        `https://api-keewe.com/api/v1/drawer/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = response?.data?.data;
      if (data === undefined) {
        console.error('api error: No data found');
        return null;
      }

      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error('api error2: ', err.message);
      }
      return null;
    }
  },
  getModifiedFolderList: async (request: UserFolderListGetRequest) => {
    return MypageAPI.getFolderList(request)
      .then(modifyData)
      .catch((err) => {
        console.error('getModifiedFolderList: ', err);
      });
  },
};

export interface TabInfo {
  tabs: {
    isClicked: boolean;
    id: number;
    name: string;
  }[];
  selectedTab: {
    isClicked: boolean;
    id: number;
    name: string;
  };
}

export function modifyData(data: UserFolderListGetResponse['data'] | undefined): TabInfo {
  // base case 1: data가 없을 때 or data가 undefined일때
  if (!data?.length || data === undefined)
    return { tabs: [], selectedTab: { isClicked: false, id: 0, name: '' } };

  const mappedData = data.map((data) => {
    return {
      ...data,
      isClicked: false,
    };
  });
  mappedData.unshift({ id: 0, name: '전체', isClicked: true });

  const selectedTab = mappedData.filter((data) => data.isClicked === true);
  return {
    tabs: mappedData,
    selectedTab: selectedTab[0],
  };
}
