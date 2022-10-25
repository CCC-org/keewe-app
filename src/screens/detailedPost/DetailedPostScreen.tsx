import { Pressable, ScrollView, StyleSheet, View, Text } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import DetailedPostSection from './DetailedPostSection';
import { DetailedPostApi } from '../../utils/api/DetailedPostAPI';
import { useIncreaseView } from '../../utils/hooks/DetailedInsight/useIncreaseView';
import { useTheme } from 'react-native-paper';
import Comments from '../../components/comments/Comments';

const DetailedPostScreen = ({ navigation }) => {
  const [insightText, setInsightText] = useState('');
  const [commentText, setCommentText] = useState('');
  const [link, setLink] = useState('');
  const [currentChallenge, setCurrentChallenge] = useState('내가 참여중인 챌린지');
  // useIncreaseView의 전달인자는 추후에 route의 id를 집어넣어야함
  const [views] = useIncreaseView(30);
  const [total, setTotal] = useState(0);

  const theme = useTheme();
  useEffect(() => {
    async function getInsight() {
      try {
        /**
         getInsight(전달인자)
         전달인자는, 추후에 InsightScreen 의 route 에 있는 id를 집어넣어야 함.
         */
        const res = await DetailedPostApi.getInsight(String(30));
        const data = res.data;
        if (data.contents !== insightText) {
          setInsightText(data.contents);
        }
        if (data.link.url !== link) {
          setLink(data.link.url);
        }
      } catch (error) {
        alert(error);
      }
    }
    getInsight();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={styles.headerRight}>
            <Pressable onPress={() => alert('bookmark')}>
              <Feather name="bookmark" size={24} color="black" />
            </Pressable>
            <Pressable onPress={() => alert('share')}>
              <Feather name="share" size={24} color="black" />
            </Pressable>
            <Pressable onPress={() => alert('three dots')}>
              <Entypo name="dots-three-vertical" size={24} color="black" />
            </Pressable>
          </View>
        );
      },
    });
  });
  return (
    <>
      <ScrollView>
        <DetailedPostSection
          insightText={insightText}
          views={views}
          link={link}
          currentChallenge={currentChallenge}
        />
        {/* <RepresentativeCommentsSection
          nickname="nickname"
          title="타이틀"
          content="좋아요!"
          total={4}
        /> */}
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
        <Comments content={commentText} nickname="글쓴이" title="타이틀" />
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
  },
});
