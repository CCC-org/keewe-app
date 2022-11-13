import { Pressable, ScrollView, StyleSheet, View, Text } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import DetailedPostSection from './DetailedPostSection';
import { useIncreaseView } from '../../utils/hooks/DetailedInsight/useIncreaseView';
import { useTheme } from 'react-native-paper';
import Comments from '../../components/comments/Comments';
import MoreCommentsButton from '../../components/buttons/MoreCommentsButton';
import { useQuery } from 'react-query';
import { InsightAPI, InsightQueryKeys } from '../../utils/api/InsightAPI';
import Profile from '../../components/profile/Profile';
import { querySuccessError } from '../../utils/helper/queryReponse/querySuccessError';

const DetailedPostScreen = ({ navigation }) => {
  const [currentChallenge, setCurrentChallenge] = useState('내가 참여중인 챌린지');
  // useIncreaseView의 전달인자는 추후에 route의 id를 집어넣어야함
  const [views] = useIncreaseView(30);
  const [data2, setData2] = useState({
    total: 10,
    comments: [
      {
        id: 1,
        writer: {
          id: 1,
          name: '유승훈',
          title: '타이틀1',
          image: 'www.api-keewe.com/images',
        },
        content: '댓글의 내용',
        createdAt: '2022-10-23T22:51:44.188726',
        replies: [
          {
            writer: {
              id: 1,
              name: '유승훈',
              title: '타이틀1',
              image: 'www.api-keewe.com/images',
            },
            id: 2,
            parentId: 1,
            content: '답글1 내용',
            createdAt: '2022-10-23T22:51:44.188726',
          },
          {
            writer: {
              id: 1,
              name: '유승훈',
              title: '타이틀1',
              image: 'www.api-keewe.com/images',
            },
            id: 3,
            parentId: 1,
            content: '답글2 내용',
            createdAt: '2022-10-23T22:51:44.188726',
          },
        ],
        totalReply: 2,
      },
    ],
  });
  const [total, setTotal] = useState(data2.total);

  const theme = useTheme();
  const { data: profile, isProfileLoading } = useQuery(
    InsightQueryKeys.getProfile({ insightId: 23 }),
    () => InsightAPI.getProfile({ insightId: 23 }),
    querySuccessError,
  );
  const { data: insightResponse, isLoading: isInsightLoading } = useQuery(
    InsightQueryKeys.getInsight({ insightId: 23 }),
    () => InsightAPI.getInsight({ insightId: 23 }),
    querySuccessError,
  );

  // const { data: data2, isLoading: isLoading2 } = useQuery(
  //   InsightQueryKeys.getRepresentativeComments({ insightId: 1 }),
  //   () => InsightAPI.getRepresentativeComments({ insightId: 1 }),
  //   querySuccessError,
  // );

  console.log('detailedPost data: ', profile);
  console.log('isLoading: ', isProfileLoading);

  // useEffect(() => {
  //   console.log('data2', data2);
  // }, []);

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

  return (
    <>
      <ScrollView>
        {!isInsightLoading && (
          <DetailedPostSection
            insightId={23}
            insightText={insightResponse?.contents ?? ''}
            views={views}
            link={insightResponse?.link ?? ''}
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
          />
        )}
        {/* Insight text, link card, emoticons, etc.. */}
        {/* reply etc.. */}
        <View style={styles.commentsHeader}>
          <Text style={{ fontWeight: '600', fontSize: 18, color: theme.colors.graphic.black }}>
            댓글{' '}
          </Text>
          <Text
            style={{ fontWeight: '600', fontSize: 18, color: `${theme.colors.graphic.black}4d` }}
          >
            {total}
          </Text>
        </View>

        <View style={{ backgroundColor: 'white' }}>
          {data2.comments.map((cur, idx) => {
            const comments = [
              <Comments
                key={idx}
                content={cur.content}
                nickname={cur.writer.name}
                title={cur.writer.title}
              />,
            ];
            const replies = cur.replies.map((current, index) => {
              return (
                <View key={index} style={{ marginLeft: 44 }}>
                  <Comments
                    key={index}
                    content={current.content}
                    nickname={current.writer.name}
                    title={current.writer.title}
                  />
                </View>
              );
            });
            return comments.concat(replies);
          })}
          {data2.total < 4 ? null : (
            <View style={{ alignItems: 'center', marginVertical: 16 }}>
              <MoreCommentsButton
                onPress={handleMoreCommentsPress}
                number={data2.total - 3}
                textColor={'white'}
                backgroundColor={`${theme.colors.graphic.black}cc`}
              />
            </View>
          )}
        </View>
      </ScrollView>
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
});
