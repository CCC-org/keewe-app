interface LoginRequest {
  oauth: string;
  code?: string;
  state?: string;
}

interface LoginResponse {
  message: string;
  code: number;
  data: {
    userId: number;
    accessToken: string;
  };
}
