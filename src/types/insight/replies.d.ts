interface Replies {
  message: string;
  code: number;
  data: Data[];
}

interface Data {
  writer: CommentWriter;
  id: number;
  parentId: number;
  content: string;
  createdAt: Date;
}
