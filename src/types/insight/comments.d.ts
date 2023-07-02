interface CommentPreviewGetRequest {
  insightId: number;
}

interface CommentPreviewGetListResponse {
  message: string;
  code: number;
  data: Comment[];
}
interface CommentPreviewCountGetResponse {
  message: string;
  code: number;
  data: { commentCount: number };
}
interface CommentGetListRequest {
  insightId: number;
  cursor?: number;
  limit: number;
}

interface CommentGetListResponse {
  message: string;
  code: number;
  data: Comment[];
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
  writer?: CommentWriter;
  content: string;
  createdAt: string;
  replies?: Reply[];
  totalReply?: number;
}

interface Reply {
  writer?: CommentWriter;
  id: number;
  parentId: number;
  content: string;
  createdAt: string;
}

interface CommentWriter {
  id: number;
  name: string;
  title: string;
  image: string;
}
