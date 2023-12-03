import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import { InsightAPI, InsightQueryKeys } from '../../utils/api/InsightAPI';
import Comment from '../../components/comments/Comment';
import { Pressable, View, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import CommentXml from '../../constants/Icons/Comment/CommentXml';

const REPLY_LIMIT = 5;

interface ReplyListProps {
  insightId: number;
  parentId: number;
  authorId: number;
  totalReply: number;
}

const ReplyList = ({ insightId, parentId, authorId, totalReply }: ReplyListProps) => {
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: InsightQueryKeys.getReplies({
      insightId,
      parentId,
      limit: REPLY_LIMIT,
    }),
    queryFn: ({ pageParam = undefined }) =>
      InsightAPI.getReplies({ insightId, parentId, cursor: pageParam, limit: REPLY_LIMIT }),
    getNextPageParam: (lastPage) => {
      return lastPage?.[lastPage?.length - 1]?.id;
    },
  });

  const totalCount = data?.pages.reduce((accumulator, currentArray) => {
    return accumulator + (currentArray?.length ?? 0);
  }, 0);

  return (
    <View style={{ marginLeft: 8 }}>
      {data?.pages?.flatMap((page) =>
        page?.map((item, index) => (
          <Comment
            key={`${item.id} ${index}`}
            content={item.content}
            nickname={item.writer?.name}
            title={item.writer?.title}
            createdAt={item.createdAt}
            isInsightWriter={item.writer?.id === authorId}
            commentWriterId={item.writer?.id}
            image={item.writer?.image}
            isReply={true}
            commentId={item.id}
          />
        )),
      )}
      {totalCount !== totalReply && (
        <Pressable
          style={{ marginLeft: 100, flexDirection: 'row', alignItems: 'center' }}
          onPress={() => fetchNextPage()}
        >
          <SvgXml xml={CommentXml} />
          <Text>답글 더보기</Text>
        </Pressable>
      )}
    </View>
  );
};

export default ReplyList;
