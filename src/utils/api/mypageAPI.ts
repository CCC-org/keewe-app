import { AxiosError } from 'axios';
import httpClient from './BaseHttpClient';

export const MypageQueryKeys = {
  getProfile: (request: ProfileGetRequest) => {
    return ['mypage', 'profile', request.targetId];
  },
  getRepresentativeTitles: (request: RepresentativeTitlesGetRequest) => [
    'mypage',
    'representativeTitles',
    request.userId,
  ],
  getNonModifiedList: (request: UserFolderListGetRequest) => [
    'mypage',
    'folderList',
    'nonModified',
    request.userId,
  ],
  getFolderList: (request: UserFolderListGetRequest) => ['mypage', 'folderList', request.userId],
  getFolderInsight: (drawerId: number | string, userId: number | string) => [
    'mypage',
    'profile',
    'insight',
    drawerId,
    userId,
  ],
};

export const MypageAPI = {
  getProfile: async (request: ProfileGetRequest) => {
    const { targetId, insightId } = request;
    try {
      const { data } = await httpClient.get<ProfileGetResponse>(
        `https://api-keewe.com/api/v1/user/profile/${targetId}`,
        {
          params: { insightId },
        },
      );
      return data;
    } catch (err) {
      console.error('api error2: ', err);
      throw err;
    }
  },
  getRepresentativeTitles: async (request: RepresentativeTitlesGetRequest) => {
    const { userId } = request;
    try {
      const { data } = await httpClient.get<RepresentativeTitlesGetResponse>(
        `https://api-keewe.com/api/v1/user/profile/achieved-title/${userId}`,
      );
      return data;
    } catch (err) {
      console.error('api error2: ', err);
      throw err;
    }
  },
  getFolderList: async (request: UserFolderListGetRequest) => {
    const { userId } = request;
    if (userId === 'undefined') return null;
    if (!userId) return null;
    try {
      const response = await httpClient.get<UserFolderListGetResponse>(
        `https://api-keewe.com/api/v1/drawer/${userId}`,
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
        throw err; // 에러를 다시 던집니다.
      });
  },
};

function modifyData(data: UserFolderListGetResponse['data'] | null): TabInfo {
  if (!data?.length || data === null)
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
