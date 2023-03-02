interface Profile {
  message: string;
  code: number;
  data: ProfileData;
}

interface ProfileData {
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

interface InsightProfileRequest {
  insightId: number;
}

interface Interest {
  name: string;
}

interface ChallengeRecordRequest {
  insightId: number;
}

interface ChallengeRecordResponse {
  message: string;
  code: number;
  data: {
    challengeId: number;
    challengeName: string;
    order: number;
    total: number;
  };
}
