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

interface InsightGetRequest {
  insightId: number;
}

interface InsightGetReponse {
  message: string;
  code: number;
  data: Insight;
}
interface InsightReportRequest {
  reportType: string;
  reason?: string;
  insightId: number;
}
interface InsightReportResponse {
  message: string;
  code: number;
}
interface Insight {
  id: number;
  contents: string;
  link: Link;
  reaction: Reaction;
  bookmark: boolean;
}

interface Link {
  url: string;
}

interface Reaction {
  clap: number;
  heart: number;
  sad: number;
  surprise: number;
  fire: number;
  eyes: number;
}

interface InsightReactRequest {
  reactionType: string;
  insightId: Insight['id'];
  value: number;
}

interface InsightReactResponse {
  message: string;
  code: number;
  data: {
    count: number;
  };
}
