import React from 'react';
import Comment from './Comment';
import { ReplyInfo } from './CommentInput';

interface CommentListProps {
  comments: Comment[];
  onReply: (info: ReplyInfo) => void;
}

const CommentList = ({ comments, onReply }: CommentListProps) => {
  return (
    <>
      {comments.map((cur) => {
        const comment = [
          <Comment
            key={cur.id}
            content={cur.content}
            nickname={cur.writer.name}
            title={cur.writer.title}
            createdAt={cur.createdAt}
            isReply={false}
            onReply={() => onReply({ id: cur.id, nickname: cur.writer.name })}
          />,
        ];
        const repies = cur.replies.map((reply) => (
          <Comment
            key={`${cur.id} reply ${reply.id}`}
            content={reply.content}
            nickname={reply.writer.name}
            createdAt={reply.createdAt}
            title={reply.writer.title}
            isReply={true}
          />
        ));
        return comment.concat(repies);
      })}
    </>
  );
};

export default CommentList;
