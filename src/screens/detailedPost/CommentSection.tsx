import React, { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { InsightAPI, InsightQueryKeys } from '../../utils/api/InsightAPI';
import { FlatList, Pressable, TextInput, Text } from 'react-native';
import Comment from '../../components/comments/Comment';
import { ReplyInfo } from '../../components/comments/CommentInput';
import { SvgXml } from 'react-native-svg';
import CommentXml from '../../constants/Icons/Comment/CommentXml';

const COMMENT_LIMIT = 10;

interface CommentSectionProps {
  insightId: number;
  writerId: number;
  headerComponent: React.ReactNode;
}

type ReplyCursor = {
  parentId?: number;
  cursor?: number;
};

const CommentSection = ({ insightId, writerId, headerComponent }: CommentSectionProps) => {
  const [comment, setComment] = useState<Comment[]>([]);
  const [commentCursor, setCommentCursor] = useState<number | undefined>(undefined);
  const [replyInfo, setReplyInfo] = useState<ReplyInfo | undefined>(undefined);
  const [replyCursor, setReplyCursor] = useState<ReplyCursor | undefined>(undefined);
  const ref = useRef<TextInput>(null);

  const handleReplyClick = (info: ReplyInfo) => {
    ref?.current?.focus();
    setReplyInfo(info);
  };

  useQuery(
    InsightQueryKeys.getCommentList({
      insightId,
      cursor: commentCursor,
      limit: COMMENT_LIMIT,
    }),
    () => InsightAPI.getCommentList({ insightId, cursor: commentCursor, limit: COMMENT_LIMIT }),
    {
      onSuccess: (response: CommentGetListResponse) => {
        setComment((prev) => [...prev, ...response.data]);
      },
    },
  );

  useQuery(
    InsightQueryKeys.getReplies({
      parentId: replyCursor?.parentId,
      insightId,
      cursor: replyCursor?.cursor,
      limit: COMMENT_LIMIT,
    }),
    () =>
      InsightAPI.getReplies({
        parentId: replyCursor?.parentId,
        insightId,
        cursor: replyCursor?.cursor,
        limit: COMMENT_LIMIT,
      }),
    {
      enabled: replyCursor?.parentId !== undefined,
      onSuccess: async (response: ReplyGetListResponse) => {
        await setComment((prev) => {
          const idx = prev.findIndex((item) => item.id === replyCursor?.parentId);
          prev[idx]?.replies?.push(...response.data);
          return [...prev];
        });
      },
    },
  );

  const onEndReached = () => {
    if (comment.length === 0) return;
    if (comment[comment.length - 1]?.id !== undefined)
      setCommentCursor(comment[comment.length - 1].id);
  };

  const renderItem = ({ item, index }) => {
    const comments = [
      <Comment
        key={`${item.id} ${index}`}
        content={item.content}
        nickname={item.writer?.name}
        title={item.writer?.title}
        createdAt={item.createdAt}
        isInsightWriter={item.writer?.id === writerId}
        commentWriterId={item.writer?.id}
        image={item.writer?.image}
        isReply={false}
        onReply={() => handleReplyClick({ id: item.id, nickname: item.writer?.name })}
        commentId={item.id}
      />,
    ];
    const repies = item.replies.map((reply) => (
      <Comment
        commentId={reply.id}
        key={`${item.id} reply ${reply.id} ${index}`}
        content={reply.content}
        commentWriterId={reply.writer?.id}
        image={reply.writer?.image}
        isInsightWriter={reply.writer?.id === writerId}
        nickname={reply.writer?.name}
        createdAt={reply.createdAt}
        title={reply.writer?.title}
        isReply={true}
      />
    ));
    return (
      <>
        {comments.concat(repies)}
        {item.totalReply !== item.replies.length && (
          <Pressable
            style={{ marginLeft: 100, flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
              const parentData = comment.find((comment) => comment.id === item.id)?.replies ?? [];
              setReplyCursor({
                parentId: item.id,
                cursor: parentData[parentData?.length - 1].id,
              });
            }}
          >
            <SvgXml xml={CommentXml} />
            <Text>답글 {item.totalReply - item.replies.length}개 더보기</Text>
          </Pressable>
        )}
      </>
    );
  };

  return (
    <>
      <FlatList
        data={comment}
        renderItem={renderItem}
        onEndReached={onEndReached}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ListHeaderComponent={headerComponent}
      />
    </>
  );
};
export default CommentSection;
