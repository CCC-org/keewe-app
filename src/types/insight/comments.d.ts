interface RepresentiveCommentGetListRequest {
  insightId: number;
}

interface RepresentiveCommentGetListResponse {
  message: string;
  code: number;
  data: {
    total: number;
    comments: Comment[];
  };
}

interface CommentGetListRequest {
  insightId: number;
  cursor?: number;
  limit: number;
}

interface CommentGetListResponse {
  message: string;
  code: number;
  data: {
    total: number;
    comments: Comment[];
  };
}

interface ReplyGetListRequest {
  parentId?: number;
  insightId: number;
  cursor?: number;
  limit: number;
}

interface ReplyGetListResponse {
  message: string;
  code: number;
  data: Reply[];
}

interface CommentCreateRequest {
  insightId: number;
  content: string;
  parentId?: number;
}
interface CommentCreateResponse {
  message: string;
  code: number;
  data: {
    commentId: Comment['id'];
  };
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
