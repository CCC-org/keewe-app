import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
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
import { MypageQueryKeys } from '../../utils/api/mypageAPI';
import { getUserId } from '../../utils/hooks/asyncStorage/Login';
import { SvgXml } from 'react-native-svg';
import { DetailedPostApi } from '../../utils/api/DetailedPostAPI';
import BookMarkOffXml from '../../constants/Icons/DetailedPost/BookMarkOffXml';
import BookMarkOnXml from '../../constants/Icons/DetailedPost/BookMarkOnXml';
import ShareIconXml from '../../constants/Icons/DetailedPost/ShareIconXml';
import ThreeDotsXml from '../../constants/Icons/DetailedPost/ThreeDotsXml';
import SnackBar from '../../components/bars/SnackBar';

const DetailedPostScreen = ({ navigation, route }) => {
  const { insightId } = route.params;
  const [currentChallenge, setCurrentChallenge] = useState('내가 참여중인 챌린지');
  const [views] = useIncreaseView(insightId);
  const [replyInfo, setReplyInfo] = useState<ReplyInfo | undefined>();
  const [representiveReplies, setRepresentiveReplies] = useState(0);
  const [bookmarkOn, setBookmarkOn] = useState<boolean | undefined>(false);
  const [snackBarOn, setSnackBarOn] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const theme = useTheme();

  const { data: profile, isLoading: isProfileLoading } = useQuery(
    InsightQueryKeys.getProfile({ insightId }),
    () => InsightAPI.getProfile({ insightId }),
    querySuccessError,
  );

  const followMutation = useMutation({
    mutationFn: () => FollowAPI.follow(profile.data.authorId),
    onMutate: async () => {
      const key = InsightQueryKeys.getProfile({ insightId });
      await queryClient.cancelQueries({ queryKey: key });
      // Snapshot the previous value
      const prevState = queryClient.getQueryData<any>(key);
      // Optimistically update to the new value
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

      // Return a context object with the snapshotted value
      return { prevState };
    },

    onError: (err, variables, context) => {
      console.log('profile mutate err');
      const key = InsightQueryKeys.getProfile({ insightId });
      queryClient.setQueryData(key, context?.prevState);
    },
  });

  followMutation.mutate;

  const handleBookmark = () => {
    DetailedPostApi.BookMark(insightId)
      .then((value) => {
        setBookmarkOn(value?.bookmark);
        setSnackBarOn(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const { data: insightResponse, isLoading: isInsightLoading } = useQuery(
    InsightQueryKeys.getInsight({ insightId }),
    () => InsightAPI.getInsight({ insightId }),
    querySuccessError,
  );

  const { data: getCommentResponse, isLoading: isCommentLoading } = useQuery(
    InsightQueryKeys.getRepresentiveCommentList({ insightId }),
    () => InsightAPI.getRepresentiveCommentList({ insightId }),
    {
      onSuccess: (response) => {
        response?.data.comments.map((comment) =>
          setRepresentiveReplies((prev) => prev + comment.replies.length + 1),
        );
      },
    },
  );

  useEffect(() => {
    setBookmarkOn(route?.params?.bookmark);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={styles.headerRight}>
            <Pressable onPress={handleBookmark}>
              <SvgXml xml={bookmarkOn ? BookMarkOnXml : BookMarkOffXml} />
            </Pressable>
            <Pressable
              onPress={() =>
                navigation.navigate('Share', {
                  name: profile ? profile.data.nickname : 'null ',
                  title: profile ? profile.data.title : 'null ',
                  image: profile ? profile.data.image : 'null ',
                  challenge: currentChallenge,
                  insightText: insightResponse?.data?.contents ?? '',
                })
              }
            >
              <SvgXml xml={ShareIconXml} />
            </Pressable>
            <Pressable onPress={() => alert('three dots')}>
              <SvgXml xml={ThreeDotsXml} />
            </Pressable>
          </View>
        );
      },
    });
  }, [profile, insightResponse, currentChallenge, bookmarkOn]);

  const handleMoreCommentsPress = () => {
    navigation.navigate('Comments', { insightId });
  };

  const handleReplyClick = (info: ReplyInfo) => {
    setReplyInfo(info);
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'position' })} // position || padding
        keyboardVerticalOffset={Platform.select({ ios: 90 })}
      >
        <ScrollView style={{ paddingBottom: '100%', marginBottom: 70 }}>
          {!isInsightLoading && (
            <DetailedPostSection
              insightId={insightId}
              insightText={insightResponse?.data?.contents ?? ''}
              views={views}
              url={insightResponse?.data?.link?.url ?? ''}
              currentChallenge={currentChallenge}
              reaction={insightResponse.data.reaction}
              authorId={profile?.data?.authorId ?? -1}
            />
          )}

          {isProfileLoading ? null : (
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
          )}
          <View
            style={{ ...styles.commentDivider, backgroundColor: theme.colors.brand.surface.main }}
          />
          {!isCommentLoading && (
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
                  {getCommentResponse?.data.total}
                </Text>
              </View>

              <View style={{ backgroundColor: 'white', paddingBottom: 16 }}>
                <>
                  {getCommentResponse?.data.comments.map((cur) => {
                    const comment = [
                      <Comment
                        key={cur.id}
                        content={cur.content}
                        nickname={cur.writer.name}
                        title={cur.writer.title}
                        createdAt={cur.createdAt}
                        isReply={false}
                        onReply={() => handleReplyClick({ id: cur.id, nickname: cur.writer.name })}
                      />,
                    ];
                    const repies = cur.replies.map((reply) => (
                      <Comment
                        key={`${cur.id} reply ${reply.id}`}
                        content={reply.content}
                        nickname={reply.writer.name}
                        createdAt={reply.createdAt}
                        title={reply.writer.title}
                        isReply={true}
                      />
                    ));
                    return comment.concat(repies);
                  })}
                  {getCommentResponse.data.total > representiveReplies && (
                    <View
                      style={{
                        marginTop: 16,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <MoreCommentsButton
                        onPress={handleMoreCommentsPress}
                        number={getCommentResponse.data.total - representiveReplies}
                        textColor={'white'}
                        backgroundColor={`${theme.colors.graphic.black}cc`}
                      />
                    </View>
                  )}
                </>
              </View>
            </>
          )}
          <SnackBar
            text={bookmarkOn ? '북마크에 저장했어요.' : '북마크에서 삭제했어요.'}
            visible={snackBarOn}
            duration={1000}
            onDismiss={() => setSnackBarOn(false)}
          />
        </ScrollView>
        <CommentInput
          insightId={insightId}
          replyInfo={replyInfo}
          onCancelReply={() => setReplyInfo(undefined)}
          onCreate={() => {
            return;
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
});
