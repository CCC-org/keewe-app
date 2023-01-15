import { Pressable, FlatList, Text, Platform, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import Comment from '../../components/comments/Comment';
import { useQuery } from '@tanstack/react-query';
import { InsightAPI, InsightQueryKeys } from '../../utils/api/InsightAPI';
import { ReplyInfo } from '../../components/comments/CommentInput';
import CommentInput from '../../components/comments/CommentInput';
import CommentXml from '../../constants/Icons/Comment/CommentXml';
import { SvgXml } from 'react-native-svg';
import { View } from '../../components/Themed';

const COMMENT_LIMIT = 10;

type ReplyCursor = {
  parentId?: number;
  cursor?: number;
};

const CommentsScreen = ({ navigation, route }) => {
  const { insightId } = route.params;
  const [data, setData] = useState<Comment[]>([]);
  const [commentCursor, setCommentCursor] = useState<number | undefined>(undefined);
  const [replyCursor, setReplyCursor] = useState<ReplyCursor | undefined>(undefined);
  const [replyInfo, setReplyInfo] = useState<ReplyInfo | undefined>(undefined);

  const handleReplyClick = (info: ReplyInfo) => {
    setReplyInfo(info);
  };

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

  const { isLoading: isReplyLoading } = useQuery(
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
      onSuccess: async (response) => {
        await setData((prev) => {
          const idx = prev.findIndex((item) => item.id === replyCursor?.parentId);
          prev[idx].replies.push(...response.data);
          return [...prev];
        });
        if (response.data.length < COMMENT_LIMIT) {
          setReplyCursor(undefined);
        } // return to comment
      },
    },
  );

  const renderItem = ({ item, index }) => {
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
        {item.totalReply !== item.replies.length && item.replies.length === 1 && (
          <Pressable
            style={{ marginLeft: 100, flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
              setData((prev) => {
                prev[index].replies = [];
                return [...prev.slice(0, index + 1)];
              });
              setCommentCursor(data[index].id);
              setReplyCursor({ parentId: item.id });
            }}
          >
            <SvgXml xml={CommentXml} />
            <Text>답글 {item.totalReply - 1}개 더보기</Text>
          </Pressable>
        )}
      </>
    );
  };

  const onEndReached = () => {
    if (replyCursor?.parentId === undefined) setCommentCursor(data[data.length - 1].id);
    else {
      setReplyCursor((prev) => {
        const parentData = data.find((comment) => comment.id === replyCursor.parentId);
        return {
          ...prev,
          cursor:
            parentData?.replies.length != 0
              ? parentData?.replies[parentData?.replies.length - 1].id
              : undefined,
        };
      });
    }
    return;
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'position' })} // position || padding
        keyboardVerticalOffset={Platform.select({ ios: 90 })}
        style={{ flex: 1 }}
      >
        <FlatList
          data={data}
          renderItem={renderItem}
          onEndReached={onEndReached}
          style={{ paddingBottom: '100%', marginBottom: 80 }}
        />
        <CommentInput
          insightId={insightId}
          replyInfo={replyInfo}
          onCancelReply={() => setReplyInfo(undefined)}
          onCreate={() => {
            setData([]);
            setCommentCursor(undefined);
            setReplyCursor(undefined);
            setReplyInfo(undefined);
          }}
        />
      </KeyboardAvoidingView>
    </>
  );
};

export default CommentsScreen;
