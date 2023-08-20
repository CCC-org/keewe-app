/* eslint-disable indent */
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  RefreshControl,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React from 'react';
import { useLayoutEffect, useRef, useState } from 'react';
import DetailedPostSection from './DetailedPostSection';
import { useIncreaseView } from '../../utils/hooks/DetailedInsight/useIncreaseView';
import { useTheme } from 'react-native-paper';
import { InsightAPI, InsightQueryKeys } from '../../utils/api/InsightAPI';
import Profile from '../../components/profile/Profile';
import CommentInput from '../../components/comments/CommentInput';
import { ReplyInfo } from '../../components/comments/CommentInput';
import Comment from '../../components/comments/Comment';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { FollowAPI } from '../../utils/api/FollowAPI';
import { SvgXml } from 'react-native-svg';
import { DetailedPostApi } from '../../utils/api/DetailedPostAPI';
import BookMarkOffXml from '../../constants/Icons/DetailedPost/BookMarkOffXml';
import BookMarkOnXml from '../../constants/Icons/DetailedPost/BookMarkOnXml';
import ShareIconXml from '../../constants/Icons/DetailedPost/ShareIconXml';
import { FeedQueryKeys } from '../../utils/api/FeedAPI';
import FeedVerticalDots from '../Feed/FeedVerticalDots';
import Toast from 'react-native-toast-message';
import removeEscapeSequences from '../../utils/helper/strings/removeEscapeSequence';
import { getUserId } from '../../utils/hooks/asyncStorage/Login';
import CommentXml from '../../constants/Icons/Comment/CommentXml';

const COMMENT_LIMIT = 5;

type ReplyCursor = {
  parentId?: number;
  cursor?: number;
  index: number;
};

type HighlightCursor = {
  parentId?: number;
  index: number;
};

const DetailedPostScreen = ({ navigation, route }) => {
  const { insightId, initialInsight } = route.params;
  const [views] = useIncreaseView(insightId);
  const [replyInfo, setReplyInfo] = useState<ReplyInfo | undefined>();
  const [pageRefreshing, setPageRefreshing] = useState(false);
  const [comment, setComment] = useState<Comment[]>([]);
  const [commentCursor, setCommentCursor] = useState<number | undefined>(undefined);
  const [replyCursor, setReplyCursor] = useState<ReplyCursor | undefined>(undefined);
  const [highlightCursor, setHighlightCursor] = useState<HighlightCursor | undefined>(undefined);

  const ref = useRef<TextInput>(null);
  const scrollViewRef = useRef<any>(null);

  const queryClient = useQueryClient();
  const theme = useTheme();

  const { data: profile, isLoading: isProfileLoading } = useQuery(
    InsightQueryKeys.getProfile({ insightId }),
    () => InsightAPI.getProfile({ insightId }),
  );

  useQuery(
    InsightQueryKeys.getCommentList({
      insightId,
      cursor: commentCursor,
      limit: COMMENT_LIMIT,
    }),
    () => InsightAPI.getCommentList({ insightId, cursor: commentCursor, limit: COMMENT_LIMIT }),
    {
      onSuccess: (response: CommentGetListResponse) => {
        const dataMap = [...comment, ...response.data].reduce((acc, currentItem) => {
          acc[currentItem.id] = currentItem;
          return acc;
        }, {});

        const uniqueData: Comment[] = Object.values(dataMap);
        setComment(uniqueData);
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
        const idx = comment.findIndex((item) => item.id === replyCursor?.parentId);
        const dataMap = [...(comment[idx]?.replies ?? []), ...response.data].reduce(
          (acc, currentItem) => {
            acc[currentItem.id] = currentItem;
            return acc;
          },
          {},
        );
        const uniqueData: Comment[] = [
          ...comment.slice(0, replyCursor?.index),
          { ...comment[replyCursor?.index ?? 0], replies: Object.values(dataMap) },
          ...comment.slice((replyCursor?.index ?? 0) + 1),
        ];
        setComment(uniqueData);
      },
    },
  );

  const followMutation = useMutation({
    mutationFn: () => FollowAPI.follow(String(profile?.data?.authorId), String(insightId)),
    onMutate: async () => {
      const key = InsightQueryKeys.getProfile({ insightId });
      await queryClient.cancelQueries({ queryKey: key });
      const prevState = queryClient.getQueryData<any>(key);
      queryClient.setQueryData(key, (old: any) => {
        const newProfile = {
          ...old,
          data: {
            ...old.data,
            following: !old.data.following,
          },
        };

        return newProfile;
      });
      return { prevState };
    },

    onError: (err, variables, context) => {
      console.log('profile mutate err');
      const key = InsightQueryKeys.getProfile({ insightId });
      queryClient.setQueryData(key, context?.prevState);
    },
  });

  const handleBookmark = () => {
    DetailedPostApi.BookMark(insightId)
      .then((value) => {
        Toast.show({
          type: 'snackbar',
          text1: !insightResponse?.data?.bookmark
            ? '북마크에 저장했어요.'
            : '북마크에서 삭제했어요.',
          position: 'bottom',
        });
        queryClient.invalidateQueries(InsightQueryKeys.getInsight({ insightId }));
        queryClient.invalidateQueries(FeedQueryKeys.getFeed());
      })
      .catch((e) => {
        console.error(e);
      });
  };

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
        isInsightWriter={item.writer?.id === profile?.data?.authorId}
        commentWriterId={item.writer?.id}
        image={item.writer?.image}
        isReply={false}
        onReply={() => handleReplyClick({ id: item.id, nickname: item.writer?.name })}
        commentId={item.id}
        highlight={
          highlightCursor !== undefined && highlightCursor?.parentId === undefined && index === 0
        }
      />,
    ];
    const repies = item.replies.map((reply, replyIndex) => (
      <Comment
        commentId={reply.id}
        key={`${item.id} reply ${reply.id} ${index}`}
        content={reply.content}
        commentWriterId={reply.writer?.id}
        image={reply.writer?.image}
        isInsightWriter={reply.writer?.id === profile?.data?.authorId}
        nickname={reply.writer?.name}
        createdAt={reply.createdAt}
        title={reply.writer?.title}
        isReply={true}
        highlight={
          highlightCursor !== undefined && highlightCursor?.parentId === item.id && replyIndex === 0
        }
      />
    ));
    return (
      <>
        {comments.concat(repies)}
        {item.totalReply > item.replies.length && (
          <Pressable
            style={{ marginLeft: 100, flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
              const parentData = comment.find((comment) => comment.id === item.id)?.replies ?? [];
              setReplyCursor({
                parentId: item.id,
                cursor: parentData[parentData?.length - 1].id,
                index,
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

  const {
    data: insightResponse,
    isLoading: isInsightLoading,
    isError: isInsightError,
  } = useQuery(InsightQueryKeys.getInsight({ insightId }), () =>
    InsightAPI.getInsight({ insightId }),
  );

  const {
    data: getCommentResponse,
    isLoading: isCommentLoading,
    isError: isCommentError,
  } = useQuery(InsightQueryKeys.getCommentPreviewList({ insightId }), () =>
    InsightAPI.getCommentPreviewList({ insightId }),
  );

  const {
    data: getCountResponse,
    isLoading: isCountLoading,
    isError: isCountError,
  } = useQuery(InsightQueryKeys.getCommentPreviewCount({ insightId }), () =>
    InsightAPI.getCommentPreviewCount({ insightId }),
  );

  const {
    data: getChallengeRecordResponse,
    isLoading: isChallengeRecordLoading,
    isError: isChallengeRecordError,
  } = useQuery(InsightQueryKeys.getChallengeRecord({ insightId }), () =>
    InsightAPI.getChallengeRecord({ insightId }),
  );

  const recordOrder = getChallengeRecordResponse?.data?.order;
  const recordTotal = getChallengeRecordResponse?.data?.total;
  const recordText = recordOrder && recordTotal ? `${recordOrder}/${recordTotal}` : '';

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={styles.headerRight}>
            <Pressable onPress={handleBookmark}>
              <SvgXml xml={insightResponse?.data?.bookmark ? BookMarkOnXml : BookMarkOffXml} />
            </Pressable>
            <Pressable
              onPress={() =>
                navigation.navigate('Share', {
                  insightId: insightId,
                  name: profile ? profile?.data?.nickname : 'null ',
                  title: profile ? profile?.data?.title : 'null ',
                  image: profile ? profile?.data?.image : 'null ',
                  challenge: getChallengeRecordResponse?.data?.challengeName ?? '',
                  insightText: insightResponse?.data?.contents ?? '',
                  recordText,
                })
              }
            >
              <SvgXml xml={ShareIconXml} />
            </Pressable>
            <FeedVerticalDots
              contents={insightResponse?.data?.contents ?? ''}
              link={removeEscapeSequences(insightResponse?.data?.link.url ?? '')}
              userName={profile?.data?.nickname ?? ''}
              nickname={profile?.data?.nickname}
              userId={profile?.data?.authorId ?? 0}
              insightId={insightId}
            />
          </View>
        );
      },
    });
  }, [profile, insightResponse, getChallengeRecordResponse]);

  const handleReplyClick = (info: ReplyInfo) => {
    setReplyInfo(info);
    ref.current?.focus();
  };

  const tempReaction = {
    clap: 38,
    eyes: 27,
    fire: 22,
    heart: 33,
    sad: 78,
    surprise: 45,
  };

  if (isInsightError || isCommentError || isCountError || isChallengeRecordError) {
    return null;
  }

  const onRefresh = () => {
    setComment([]);
    setPageRefreshing(true);
    queryClient.invalidateQueries(['insight']);
    queryClient.invalidateQueries(['comment']).then(() => setPageRefreshing(false));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'position' })} // position || padding
        keyboardVerticalOffset={Platform.select({ ios: 90 })}
        style={{ height: '100%' }}
      >
        <FlatList
          data={comment}
          ListEmptyComponent={
            <View
              style={{
                backgroundColor: 'white',
                width: '100%',
                alignItems: 'center',
                height: 200,
              }}
            >
              <Text
                style={{
                  ...theme.fonts.text.body1.regular,
                  color: `${theme.colors.graphic.black}80`,
                  marginTop: 32,
                }}
              >
                아직 댓글이 없어요.
              </Text>
            </View>
          }
          renderItem={renderItem}
          onEndReached={onEndReached}
          ref={scrollViewRef}
          refreshControl={<RefreshControl refreshing={pageRefreshing} onRefresh={onRefresh} />}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          style={{ height: '100%', marginBottom: 80 }}
          ListFooterComponent={<View style={{ marginBottom: 80 }} />}
          ListHeaderComponent={
            <>
              {!isInsightLoading && insightResponse ? (
                <DetailedPostSection
                  isProfileLoading={isProfileLoading}
                  isInsightLoading={isInsightLoading}
                  insightId={insightId}
                  insightText={insightResponse?.data?.contents ?? ''}
                  views={views}
                  url={insightResponse?.data?.link?.url ?? ''}
                  currentChallenge={getChallengeRecordResponse?.data?.challengeName}
                  challengeId={getChallengeRecordResponse?.data?.challengeId}
                  contents={insightResponse?.data?.contents ?? initialInsight ?? ''}
                  reaction={insightResponse?.data?.reaction}
                  authorId={profile?.data?.authorId ?? -1}
                  recordText={recordText}
                  userName={profile?.data?.nickname ?? ''}
                  createdAt={profile?.data?.createdAt ?? '-'}
                />
              ) : (
                <DetailedPostSection
                  isProfileLoading={isProfileLoading}
                  isInsightLoading={isInsightLoading}
                  insightId={insightId}
                  insightText={''}
                  contents={initialInsight ?? ''}
                  views={views}
                  url={''}
                  currentChallenge={''}
                  reaction={tempReaction}
                  authorId={profile?.data?.authorId ?? -1}
                  recordText={''}
                  userName={profile?.data?.nickname ?? ''}
                  createdAt={profile?.data?.createdAt ?? '-'}
                />
              )}

              {isProfileLoading ? null : (
                <Pressable
                  onPress={async () => {
                    const localUserId = await getUserId();
                    if (localUserId === String(profile?.data?.authorId)) {
                      navigation.navigate('MyProfile', {
                        userId: localUserId,
                        enteredByTab: false,
                      });
                    } else {
                      navigation.navigate('Profile', {
                        userId: profile?.data?.authorId,
                        insightId,
                      });
                    }
                  }}
                >
                  <Profile
                    nickname={profile?.data?.nickname ?? '-'}
                    title={profile?.data?.title ?? '-'}
                    self={profile?.data?.author ?? false}
                    follow={profile?.data?.following}
                    interests={profile?.data?.interests ?? []}
                    createdAt={profile?.data?.createdAt ?? '-'}
                    image={profile?.data?.image ?? ''}
                    followMutation={followMutation}
                    style={{
                      backgroundColor: theme.colors.graphic.white,
                      padding: 16,
                    }}
                  />
                </Pressable>
              )}
              <View
                style={{
                  ...styles.commentDivider,
                  backgroundColor: theme.colors.brand.surface.main,
                }}
              />
              {!isCommentLoading && !isCountLoading && (
                <>
                  <View style={styles.commentsHeader}>
                    <Text
                      style={{ fontWeight: '600', fontSize: 18, color: theme.colors.graphic.black }}
                    >
                      댓글{' '}
                    </Text>
                    <Text
                      style={{
                        fontWeight: '600',
                        fontSize: 18,
                        color: `${theme.colors.graphic.black}4d`,
                      }}
                    >
                      {getCountResponse?.data.commentCount !== 0
                        ? getCountResponse?.data?.commentCount
                        : ''}
                    </Text>
                  </View>
                </>
              )}
            </>
          }
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
            setHighlightCursor({
              parentId: replyInfo?.id,
              index: 0,
            });
            setReplyInfo(undefined);
            ref.current?.blur();
            setTimeout(() => {
              scrollViewRef.current?.scrollToIndex({
                animated: true,
                index: replyCursor ? replyCursor.index : 0,
              });
            }, 100);
          }}
          setComment={setComment}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default DetailedPostScreen;

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 100,
    marginRight: 20,
  },
  commentsHeader: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  commentDivider: {
    height: 12,
  },
  snack: {
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 16,
  },
  moreSheet: { height: 168 },
  reportSheet: { height: 375 },
  button: {
    width: 'auto',
    borderRadius: 100,
    marginHorizontal: 16,
    top: 16,
  },
});
