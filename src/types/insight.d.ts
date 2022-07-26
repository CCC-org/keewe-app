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

interface Insight {
  id: number;
  contents: string;
  link: Link;
  reaction: Reaction;
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
