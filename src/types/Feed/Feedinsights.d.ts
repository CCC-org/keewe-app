// Generated by https://quicktype.io

interface FeedInsight {
  message: string;
  code: number;
  data: InsightData[];
}

interface InsightData {
  id: number;
  contents: string;
  createdAt: string;
  link: Link;
  reaction: Reaction;
  bookmark: boolean;
  writer: InsightWriter;
  bookmarkedAt?: string;
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
  isClapClicked: boolean;
  isHeartClicked: boolean;
  isSadClicked: boolean;
  isSurpriseClicked: boolean;
  isFireClicked: boolean;
  isEyesClicked: boolean;
}

interface InsightWriter {
  writerId: number;
  nickname: string;
  title: string;
  image: string;
}
