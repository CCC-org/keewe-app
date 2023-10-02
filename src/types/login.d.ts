interface LoginRequest {
  oauth: string;
  code?: string;
  state?: string;
}

interface TokenPushRequest {
  pushToken: string;
}

interface LoginResponse {
  message: string;
  code: number;
  data: {
    userId: number;
    accessToken: string;
    alreadySignedUp: boolean;
  };
}

interface AccountResponse {
  message: string;
  code: number;
  data: {
    vendorType: string;
    identifier: string;
  };
}
