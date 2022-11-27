import { FlatList, Text } from 'react-native';
import React, { useState } from 'react';
import Comment from '../../components/comments/Comment';
import { useQuery } from 'react-query';
import { InsightAPI, InsightQueryKeys } from '../../utils/api/InsightAPI';
import { ReplyInfo } from '../../components/comments/CommentInput';
import CommentInput from '../../components/comments/CommentInput';

const COMMENT_LIMIT = 11;

const CommentsScreen = ({ navigation, route }) => {
  const { insightId } = route.params;
  const [data, setData] = useState<Comment[]>([]);
  const [commentCursor, setCommentCursor] = useState(0);
  const [replyCursor, setReplyCursor] = useState();
  const [replyInfo, setReplyInfo] = useState<ReplyInfo | undefined>();
  const { isLoading: isCommentLoading } = useQuery(
    InsightQueryKeys.getCommentList({ insightId, cursor: commentCursor, limit: COMMENT_LIMIT }),
    () => InsightAPI.getCommentList({ insightId, cursor: commentCursor, limit: COMMENT_LIMIT }),
    {
      onSuccess: (response) => {
        setData((prev) => [...prev, ...response.data]);
        setCommentCursor(commentCursor + COMMENT_LIMIT);
      },
    },
  );

  const handleReplyClick = (info: ReplyInfo) => {
    setReplyInfo(info);
  };

  const renderItem = ({ item }) => {
    const comment = [
      <Comment
        key={item.id}
        content={item.content}
        nickname={item.writer.name}
        title={item.writer.title}
        createdAt={item.createdAt}
        isReply={false}
        onReply={() => handleReplyClick({ id: item.id, nickname: item.writer.name })}
      />,
    ];
    const repies = item.replies.map((reply) => (
      <Comment
        key={`${item.id} reply ${reply.id}`}
        content={reply.content}
        nickname={reply.writer.name}
        createdAt={reply.createdAt}
        title={reply.writer.title}
        isReply={true}
      />
    ));
    return (
      <>
        {comment.concat(repies)}
        {item.total !== item.replies.length && 1 === item.replies.length && (
          <Text>답글 더보기</Text>
        )}
      </>
    );
  };

  const onEndReached = () => {
    alert(commentCursor);
    return;
  };

  return (
    <>
      <FlatList data={data} renderItem={renderItem} onEndReached={onEndReached} />
      <CommentInput
        insightId={insightId}
        replyInfo={replyInfo}
        onCancelReply={() => setReplyInfo(undefined)}
      />
    </>
  );
};

export default CommentsScreen;
