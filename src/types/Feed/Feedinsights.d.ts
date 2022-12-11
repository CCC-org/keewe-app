// Generated by https://quicktype.io

export interface FeedInsight {
  message: string;
  code: number;
  data: InsightData[];
}

export interface InsightData {
  id: number;
  contents: string;
  createdAt: string;
  link: Link;
  reaction: Reaction;
  bookmark: boolean;
  writer: Writer;
}

export interface Link {
  url: string;
}

export interface Reaction {
  clap: number;
  heart: number;
  sad: number;
  surprise: number;
  fire: number;
  eyes: number;
}

export interface Writer {
  writerId: number;
  nickname: string;
  title: string;
  image: string;
}
