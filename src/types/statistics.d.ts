interface StatisticsRequest {
  insightId: number;
}

interface StatisticsResponse {
  message: string;
  code: number;
  data: {
    viewCount: number;
    reactionCount: number;
    commentCount: number;
    bookmarkCount: number;
  };
}
