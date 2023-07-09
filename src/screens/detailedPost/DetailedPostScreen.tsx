/* eslint-disable indent */
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import React, { useLayoutEffect, useRef, useState } from 'react';
import DetailedPostSection from './DetailedPostSection';
import { useIncreaseView } from '../../utils/hooks/DetailedInsight/useIncreaseView';
import { useTheme } from 'react-native-paper';
import MoreCommentsButton from '../../components/buttons/MoreCommentsButton';
import { InsightAPI, InsightQueryKeys } from '../../utils/api/InsightAPI';
import Profile from '../../components/profile/Profile';
import { querySuccessError } from '../../utils/helper/queryReponse/querySuccessError';
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

const DetailedPostScreen = ({ navigation, route }) => {
  const { insightId, contents } = route.params;
  const [views] = useIncreaseView(insightId);
  const [replyInfo, setReplyInfo] = useState<ReplyInfo | undefined>();
  const ref = useRef<TextInput>(null);

  const queryClient = useQueryClient();
  const theme = useTheme();

  const { data: profile, isLoading: isProfileLoading } = useQuery(
    InsightQueryKeys.getProfile({ insightId }),
    () => InsightAPI.getProfile({ insightId }),
    querySuccessError,
  );

  const followMutation = useMutation({
    mutationFn: () => FollowAPI.follow(profile?.data?.authorId, String(insightId)),
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

  const { data: insightResponse, isLoading: isInsightLoading } = useQuery(
    InsightQueryKeys.getInsight({ insightId }),
    () => InsightAPI.getInsight({ insightId }),
    querySuccessError,
  );

  const { data: getCommentResponse, isLoading: isCommentLoading } = useQuery(
    InsightQueryKeys.getCommentPreviewList({ insightId }),
    () => InsightAPI.getCommentPreviewList({ insightId }),
  );

  const { data: getCountResponse, isLoading: isCountLoading } = useQuery(
    InsightQueryKeys.getCommentPreviewCount({ insightId }),
    () => InsightAPI.getCommentPreviewCount({ insightId }),
  );

  const { data: getChallengeRecordResponse, isLoading: isChallengeRecordLoading } = useQuery(
    InsightQueryKeys.getChallengeRecord({ insightId }),
    () => InsightAPI.getChallengeRecord({ insightId }),
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
              link={removeEscapeSequences(insightResponse?.data?.link.url)}
              userName={profile?.data?.nickname}
              nickname={profile?.data?.nickname}
              userId={profile?.data?.authorId}
              insightId={insightId}
            />
          </View>
        );
      },
    });
  }, [profile, insightResponse, getChallengeRecordResponse]);
  const handleMoreCommentsPress = () => {
    navigation.navigate('Comments', { insightId, contentWriterId: profile?.data.authorId });
  };

  const handleReplyClick = (info: ReplyInfo) => {
    setReplyInfo(info);
  };

  // if (isProfileLoading || isInsightLoading) {
  //   return <MainLottie />;
  // }
  const tempReaction = {
    clap: 38,
    eyes: 27,
    fire: 22,
    heart: 33,
    sad: 78,
    surprise: 45,
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'position' })} // position || padding
        keyboardVerticalOffset={Platform.select({ ios: 90 })}
      >
        <ScrollView
          bounces={false}
          alwaysBounceVertical={false}
          style={{ paddingBottom: '100%', marginBottom: 70 }}
        >
          {!isInsightLoading ? (
            <DetailedPostSection
              isProfileLoading={isProfileLoading}
              isInsightLoading={isInsightLoading}
              insightId={insightId}
              insightText={insightResponse?.data?.contents ?? ''}
              views={views}
              url={insightResponse?.data?.link?.url ?? ''}
              currentChallenge={getChallengeRecordResponse?.data?.challengeName}
              contents={insightResponse?.data?.contents}
              reaction={insightResponse.data.reaction}
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
              contents={contents}
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
                  navigation.navigate('MyProfile', { userId: localUserId, enteredByTab: false });
                } else {
                  navigation.navigate('Profile', { userId: profile?.data?.authorId, insightId });
                }
              }}
            >
              <Profile
                nickname={profile?.data?.nickname ?? '-'}
                title={profile?.data?.title ?? '-'}
                self={profile?.data?.author ?? '-'}
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
            style={{ ...styles.commentDivider, backgroundColor: theme.colors.brand.surface.main }}
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
              {getCountResponse?.data.commentCount !== 0 ? (
                <View style={{ backgroundColor: 'white', paddingBottom: 16 }}>
                  <>
                    {getCommentResponse?.data.map((cur) => (
                      <Comment
                        key={cur.id}
                        content={cur.content}
                        nickname={cur.writer?.name}
                        isInsightWriter={profile?.data?.authorId === cur.writer?.id}
                        commentId={cur.id}
                        commentWriterId={cur.writer?.id}
                        title={cur.writer?.title}
                        image={cur.writer?.image}
                        createdAt={cur.createdAt}
                        isReply={false}
                        onReply={() => {
                          ref?.current?.focus();
                          handleReplyClick({ id: cur.id, nickname: cur.writer?.name ?? '' });
                        }}
                      />
                    ))}
                    {getCommentResponse &&
                      getCountResponse &&
                      getCountResponse.data.commentCount - getCommentResponse.data.length > 0 && (
                        <View
                          style={{
                            marginTop: 16,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <MoreCommentsButton
                            onPress={handleMoreCommentsPress}
                            number={
                              getCountResponse.data.commentCount - getCommentResponse.data.length
                            }
                            textColor={'white'}
                            backgroundColor={`${theme.colors.graphic.black}cc`}
                          />
                        </View>
                      )}
                  </>
                </View>
              ) : (
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
                      fontFamily: 'pretendard',
                      fontSize: 16,
                      color: `${theme.colors.graphic.black}50`,
                      marginTop: 32,
                    }}
                  >
                    아직 댓글이 없어요.
                  </Text>
                </View>
              )}
            </>
          )}
        </ScrollView>
        <CommentInput
          ref={ref}
          insightId={insightId}
          replyInfo={replyInfo}
          onCancelReply={() => {
            setReplyInfo(undefined);
            ref.current?.blur();
          }}
          onCreate={() => {
            setReplyInfo(undefined);
            ref.current?.blur();
          }}
        />
      </KeyboardAvoidingView>
    </>
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
  buttonText: { fontFamily: 'pretendardSemiBold', fontSize: 18 },
});
