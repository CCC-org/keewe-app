import { Pressable, FlatList, Text, View } from 'react-native';
import React, { useState } from 'react';
import Comment from '../../components/comments/Comment';
import { useQuery } from 'react-query';
import { InsightAPI, InsightQueryKeys } from '../../utils/api/InsightAPI';
import { ReplyInfo } from '../../components/comments/CommentInput';
import CommentInput from '../../components/comments/CommentInput';
import CommentXml from '../../constants/Icons/Comment/CommentXml';
import { SvgXml } from 'react-native-svg';

const COMMENT_LIMIT = 11;

const CommentsScreen = ({ navigation, route }) => {
  const { insightId } = route.params;
  const [data, setData] = useState<Comment[]>([]);
  const [commentCursor, setCommentCursor] = useState<number | undefined>(undefined);
  const [replyCursor, setReplyCursor] = useState();
  const [replyInfo, setReplyInfo] = useState<ReplyInfo | undefined>();
  const { isLoading: isCommentLoading } = useQuery(
    InsightQueryKeys.getCommentList({
      insightId,
      cursor: commentCursor,
      limit: COMMENT_LIMIT,
    }),
    () => InsightAPI.getCommentList({ insightId, cursor: commentCursor, limit: COMMENT_LIMIT }),
    {
      onSuccess: (response) => {
        setData((prev) => [...prev, ...response.data]);
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
        {item.total !== item.replies.length && item.replies.length === 1 && (
          <Pressable
            style={{ marginLeft: 100, flexDirection: 'row' }}
            onPress={() => handleReplyClick()}
          >
            <SvgXml xml={CommentXml} />
            <Text>답글 {item.replies.length - 1}개 더보기</Text>
          </Pressable>
        )}
      </>
    );
  };

  const onEndReached = () => {
    alert(commentCursor);
    setCommentCursor((commentCursor === undefined ? 0 : commentCursor) + COMMENT_LIMIT);
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
