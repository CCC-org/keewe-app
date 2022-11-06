export interface Profile {
  message: string;
  code: number;
  data: Insight;
}

export interface ProfileData {
  data: {
    authorId: number;
    nickname: string;
    title: string;
    interests: Interest[];
    image?: string;
    createdAt: string;
    following: boolean;
    author: boolean;
  };
  message: string;
  code: number;
}

export interface InsightProfileRequest {
  insightId: number;
}

export interface Interest {
  name: string;
}
