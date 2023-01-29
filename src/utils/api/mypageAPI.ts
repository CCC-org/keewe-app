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
    console.log('get profile');
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
    try {
      const token = await getAccessToken();

      const { data } = await httpClient.get<UserFolderListGetResponse>(
        `https://api-keewe.com/api/v1/drawer/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return modifyData(data.data);
    } catch (err) {
      console.error('api error2: ', err);
    }
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

export function modifyData(data: UserFolderListGetResponse['data']): TabInfo {
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
