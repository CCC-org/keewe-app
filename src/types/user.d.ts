interface UserBlockRequest {
  targetId: number;
}

interface UserBlockResponse {
  message: string;
  code: number;
  data: {
    blockedUserId: number;
  };
}
