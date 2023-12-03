import React from 'react';
import Comment from '../../components/comments/Comment';
import { ReplyInfo } from '../../components/comments/CommentInput';
import ReplyList from './ReplyList';

interface CommentListProps {
  insightId: number;
  authorId: number;
  handleReplyClick: (info: ReplyInfo) => void;
  commentList?: Comment[];
}

const CommentList = ({ insightId, authorId, handleReplyClick, commentList }: CommentListProps) => {
  return (
    <>
      {commentList?.flatMap((item, index) => (
        <>
          <Comment
            key={`${item.id} ${index}`}
            content={item.content}
            nickname={item.writer?.name}
            title={item.writer?.title}
            createdAt={item.createdAt}
            isInsightWriter={item.writer?.id === authorId}
            commentWriterId={item.writer?.id}
            image={item.writer?.image}
            isReply={false}
            onReply={() => handleReplyClick({ id: item.id, nickname: item.writer?.name ?? '' })}
            commentId={item.id}
          />
          <ReplyList
            insightId={insightId}
            parentId={item.id}
            authorId={authorId}
            totalReply={item.totalReply ?? 0}
          />
        </>
      ))}
    </>
  );
};

export default CommentList;
