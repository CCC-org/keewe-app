interface ProfileGetRequest {
  insightId: string;
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
    challengeName: string;
    follow: boolean;
  };
}
