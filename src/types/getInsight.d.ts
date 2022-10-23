export interface GetInsightReponse {
  message: string;
  code: number;
  data: Data;
}

export interface Data {
  id: number;
  contents: string;
  link: Link;
  reaction: Reaction;
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
