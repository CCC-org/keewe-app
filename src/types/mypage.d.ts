interface ProfileGetRequest {
  targetId: string;
  insightId?: number;
}

interface ProfileGetResponse {
  message: string;
  code: number;
  data: {
    nickname: string;
    title: string;
    interests: Record<string, string>[];
    image: string;
    introduction: string;
    followerCount: number;
    followingCount: number;
    challengeName: string | null;
    challengeId: number | null;
    follow: boolean;
  };
}

interface RepresentativeTitlesGetRequest {
  userId: string;
}

interface RepresentativeTitlesGetResponse {
  message: string;
  code: number;
  data: RepresentativeTitlesData;
}

interface RepresentativeTitlesData {
  total: number;
  achievedTitles: AchievedTitle[];
}

interface AchievedTitle {
  titleId: number;
  name: string;
  introduction: string;
  achievedDate: string;
}

interface UserFolderListGetRequest {
  userId: string;
}

interface UserFolderListGetResponse {
  message: string;
  code: number;
  data: FolderData[];
}

interface FolderData {
  id: number;
  name: string;
}
