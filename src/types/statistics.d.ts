interface StatisticsRequest {
  insightId: number;
}

interface StatisticsResponse {
  message: string;
  code: number;
  data: {
    viewCount: number;
    reactCount: number;
    commentCount: number;
    bookmarkCount: number;
    shareCount: number;
  };
}
