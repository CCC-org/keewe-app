import {
  Pressable,
  FlatList,
  Text,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import Comment from '../../components/comments/Comment';
import { useQuery } from '@tanstack/react-query';
import { InsightAPI, InsightQueryKeys } from '../../utils/api/InsightAPI';
import { ReplyInfo } from '../../components/comments/CommentInput';
import CommentInput from '../../components/comments/CommentInput';
import CommentXml from '../../constants/Icons/Comment/CommentXml';
import { SvgXml } from 'react-native-svg';

const { height } = Dimensions.get('window');

const COMMENT_LIMIT = 10;

type ReplyCursor = {
  parentId?: number;
  cursor?: number;
};

const CommentsScreen = ({ navigation, route }) => {
  const { insightId, contentWriterId } = route.params;
  const [data, setData] = useState<Comment[]>([]);
  const [refreshIndex, setRefreshIndex] = useState<number | undefined>(undefined);
  const [commentCursor, setCommentCursor] = useState<number | undefined>(undefined);
  const [replyCursor, setReplyCursor] = useState<ReplyCursor | undefined>(undefined);
  const [replyInfo, setReplyInfo] = useState<ReplyInfo | undefined>(undefined);
  const ref = useRef<TextInput>(null);

  const handleReplyClick = (info: ReplyInfo) => {
    ref?.current?.focus();
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
      onSuccess: (response: CommentGetListResponse) => {
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
      onSuccess: async (response: ReplyGetListResponse) => {
        await setData((prev) => {
          const idx = prev.findIndex((item) => item.id === replyCursor?.parentId);
          prev[idx]?.replies?.push(...response.data);
          return [...prev];
        });
      },
    },
  );

  const renderItem = ({ item, index }) => {
    const comment = [
      <Comment
        key={`${item.id} ${index}`}
        content={item.content}
        nickname={item.writer?.name}
        title={item.writer?.title}
        createdAt={item.createdAt}
        isInsightWriter={item.writer?.id === contentWriterId}
        commentWriterId={item.writer?.id}
        image={item.writer?.image}
        isReply={false}
        onReply={() => handleReplyClick({ id: item.id, nickname: item.writer?.name })}
        highlight={refreshIndex !== undefined && refreshIndex < item.id}
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
        isInsightWriter={reply.writer?.id === contentWriterId}
        nickname={reply.writer?.name}
        createdAt={reply.createdAt}
        title={reply.writer?.title}
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
              const parentData = data.find((comment) => comment.id === item.id)?.replies ?? [];
              setReplyCursor({
                parentId: item.id,
                cursor: parentData[parentData?.length - 1].id,
              });
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
    if (data[data.length - 1]?.id !== undefined) setCommentCursor(data[data.length - 1].id);
  };

  const onViewableItemsChanged = ({ viewableItems }) => {
    viewableItems.map((item) => {
      if (
        item.item.replies.length > 1 &&
        item.item.replies.length < item.item.totalReply &&
        item.item.totalReply > 1
      ) {
        setReplyCursor({
          parentId: item.item.id,
          cursor: item.item.replies[item.item.replies.length - 1].id,
        });
      }
    });
  };

  const viewabilityConfigCallbackPairs = useRef([{ onViewableItemsChanged }]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'position' })} // position || padding
      keyboardVerticalOffset={Platform.select({ ios: 90 })}
      style={{ height: '100%' }}
    >
      <FlatList
        data={data}
        renderItem={renderItem}
        onEndReached={onEndReached}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        style={{ height: '100%', marginBottom: 80 }}
        ListFooterComponent={() => <View style={{ height: 80 }} />}
      />
      <CommentInput
        ref={ref}
        insightId={insightId}
        replyInfo={replyInfo}
        onCancelReply={() => {
          setReplyInfo(undefined);
          ref.current?.blur();
        }}
        onCreate={() => {
          setRefreshIndex(data[data.length - 1].id);
          setReplyInfo(undefined);
        }}
      />
    </KeyboardAvoidingView>
  );
};

export default CommentsScreen;
