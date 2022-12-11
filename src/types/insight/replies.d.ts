export interface Replies {
  message: string;
  code: number;
  data: Data[];
}

export interface Data {
  writer: Writer;
  id: number;
  parentId: number;
  content: string;
  createdAt: Date;
}

export interface Writer {
  id: number;
  name: string;
  title: string;
  image: string;
}
