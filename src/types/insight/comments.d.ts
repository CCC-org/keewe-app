interface Comments {
  message: string;
  code: number;
  data: Data;
}

interface Data {
  total: number;
  comments: Comment[];
}

interface Comment {
  id: number;
  writer: Writer;
  content: string;
  createdAt: string;
  replies: Reply[];
  totalReply: number;
}

interface Reply {
  writer: Writer;
  id: number;
  parentId: number;
  content: string;
  createdAt: string;
}

interface Writer {
  id: number;
  name: string;
  title: string;
  image: string;
}

interface CommentsRequest {
  insightId: number;
}
