import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Comment from '../../components/comments/Comment';
import MoreCommentsButton from '../../components/buttons/MoreCommentsButton';
import { useTheme } from 'react-native-paper';
import { useQuery } from 'react-query';
import { InsightAPI, InsightQueryKeys } from '../../utils/api/InsightAPI';
import { querySuccessError } from '../../utils/helper/queryReponse/querySuccessError';
import { ReplyInfo } from '../../components/comments/CommentInput';
import CommentInput from '../../components/comments/CommentInput';

const COMMENT_LIMIT = 5;

const CommentsScreen = ({ navigation, route }) => {
  const { insightId } = route.params;
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [commentCursor, setCommentCursor] = useState();
  const [replyCursor, setReplyCursor] = useState();
  const [replyInfo, setReplyInfo] = useState<ReplyInfo | undefined>();

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
        {item.total != item.replies.length && <Text>답글 더보기</Text>}
      </>
    );
  };

  const onEndReached = () => {
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

const styles = StyleSheet.create({});
