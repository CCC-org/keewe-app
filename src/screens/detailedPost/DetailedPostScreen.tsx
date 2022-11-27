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
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import DetailedPostSection from './DetailedPostSection';
import { useIncreaseView } from '../../utils/hooks/DetailedInsight/useIncreaseView';
import { useTheme } from 'react-native-paper';
import CommentList from '../../components/comments/CommentList';
import MoreCommentsButton from '../../components/buttons/MoreCommentsButton';
import { useQuery } from 'react-query';
import { InsightAPI, InsightQueryKeys } from '../../utils/api/InsightAPI';
import Profile from '../../components/profile/Profile';
import { querySuccessError } from '../../utils/helper/queryReponse/querySuccessError';
import CommentInput from '../../components/comments/CommentInput';
import { ReplyInfo } from '../../components/comments/CommentInput';
import Comment from '../../components/comments/Comment';

const DetailedPostScreen = ({ navigation, route }) => {
  const { insightId } = route.params;
  const [currentChallenge, setCurrentChallenge] = useState('내가 참여중인 챌린지');
  const [views] = useIncreaseView(insightId);
  const [replyInfo, setReplyInfo] = useState<ReplyInfo | undefined>();

  const theme = useTheme();
  const { data: profile, isProfileLoading } = useQuery(
    InsightQueryKeys.getProfile({ insightId }),
    () => InsightAPI.getProfile({ insightId }),
    querySuccessError,
  );
  const { data: insightResponse, isLoading: isInsightLoading } = useQuery(
    InsightQueryKeys.getInsight({ insightId }),
    () => InsightAPI.getInsight({ insightId }),
    querySuccessError,
  );
  const { data: getCommentResponse, isLoading: isCommentLoading } = useQuery(
    InsightQueryKeys.getCommentList({ insightId }),
    () => InsightAPI.getRepresentiveCommentList({ insightId }),
    querySuccessError,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={styles.headerRight}>
            <Pressable onPress={() => alert('bookmark')}>
              <Feather name="bookmark" size={24} color="black" />
            </Pressable>
            <Pressable
              onPress={() =>
                navigation.navigate('Share', {
                  name: profile ? profile.data.nickname : 'null ',
                  title: profile ? profile.data.title : 'null ',
                  image: profile ? profile.data.image : 'null ',
                  challenge: currentChallenge,
                  insightText: insightResponse.contents,
                })
              }
            >
              <Feather name="share" size={24} color="black" />
            </Pressable>
            <Pressable onPress={() => alert('three dots')}>
              <Entypo name="dots-three-vertical" size={24} color="black" />
            </Pressable>
          </View>
        );
      },
    });
  }, [profile, insightResponse, currentChallenge]);

  function handleMoreCommentsPress() {
    navigation.navigate('Comments');
  }

  const handleReplyClick = (info: ReplyInfo) => {
    setReplyInfo(info);
  };

  return (
    <>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.select({ ios: 'position' })} // position || padding
          keyboardVerticalOffset={Platform.select({ ios: -20 })}
        >
          {!isInsightLoading && (
            <DetailedPostSection
              insightId={insightId}
              insightText={insightResponse?.data?.contents ?? ''}
              views={views}
              link={insightResponse?.data?.link ?? ''}
              currentChallenge={currentChallenge}
              reaction={insightResponse.data.reaction}
            />
          )}

          {isProfileLoading ? null : (
            <Profile
              nickname={profile?.data?.nickname ?? '-'}
              title={profile?.data?.title ?? '-'}
              self={profile?.data?.author ?? '-'}
              follow={profile?.data?.following ?? true}
              interests={profile?.data?.interests ?? []}
              createdAt={profile?.data?.createdAt ?? '-'}
              image={profile?.data?.image ?? ''}
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
                  {getCommentResponse.data.total}
                </Text>
              </View>

              <View style={{ backgroundColor: 'white' }}>
                <>
                  {getCommentResponse.data.comments.map((cur) => {
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
                  {getCommentResponse.data.total >= 4 && (
                    <View style={{ alignItems: 'center', marginVertical: 16 }}>
                      <MoreCommentsButton
                        onPress={handleMoreCommentsPress}
                        number={getCommentResponse.data.total - 3}
                        textColor={'white'}
                        backgroundColor={`${theme.colors.graphic.black}cc`}
                      />
                    </View>
                  )}
                </>
              </View>
            </>
          )}
        </KeyboardAvoidingView>
      </ScrollView>
      <CommentInput
        insightId={insightId}
        replyInfo={replyInfo}
        onCancelReply={() => setReplyInfo(undefined)}
      />
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
