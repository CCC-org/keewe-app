export interface IProfile {
  message: string;
  code: number;
  data: Data;
}

export interface Data {
  authorId: number;
  nickname: string;
  title: string;
  interests: Interest[];
  image: string;
  createdAt: string;
  following: boolean;
  author: boolean;
}

export interface Interest {
  name: string;
}
