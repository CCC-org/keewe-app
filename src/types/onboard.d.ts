interface MakeProfileRequest {
  nickname: string;
  interests: string[];
}

interface MakeProfileResponse {
  message: string;
  code: number;
  data: {
    userId: number;
    nickname: string;
    interests: Record<string, string>[];
  };
}
