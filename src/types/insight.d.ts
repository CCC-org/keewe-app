interface ProfileRequest {
  insightId: number;
}

interface ProfileResponse {
  message: string;
  code: number;
  data: {
    authorId: number;
    nickname: string;
    title: string;
    interests: Record<string, string>[];
    image: string;
    createdAt: string;
    author: boolean;
  };
}
