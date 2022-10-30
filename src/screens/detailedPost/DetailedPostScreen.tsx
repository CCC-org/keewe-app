import { Pressable, StyleSheet, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import DetailedPostSection from './DetailedPostSection';
import { DetailedPostApi } from '../../utils/api/DetailedPostAPI';
import { useIncreaseView } from '../../utils/hooks/DetailedInsight/useIncreaseView';
import { useQuery } from 'react-query';
import { InsightAPI, InsightQueryKeys } from '../../utils/api/InsightAPI';
import { querySuccessError } from '../../utils/helper/queryReponse/querySuccessError';
import Profile from '../../components/profile/Profile';

const DetailedPostScreen = ({ navigation }) => {
  const [insightText, setInsightText] = useState('');
  const [link, setLink] = useState('');
  const [currentChallenge, setCurrentChallenge] = useState('내가 참여중인 챌린지');
  // useIncreaseView의 전달인자는 추후에 route의 id를 집어넣어야함
  const [views] = useIncreaseView(30);

  const { data, isLoading } = useQuery(
    InsightQueryKeys.getProfile({ insightId: 2 }),
    () => InsightAPI.getProfile({ insightId: 2 }),
    querySuccessError,
  );

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
            <Pressable onPress={() => navigation.navigate('Share')}>
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
      <View>
        <DetailedPostSection
          insightText={insightText}
          views={views}
          link={link}
          currentChallenge={currentChallenge}
        />
      </View>
      <>
        {isLoading ? null : (
          <Profile
            nickname={data.data.nickname}
            title={data.data.title}
            self={data.data.author}
            follow={data.data.following}
            interests={data.data.interests}
            createdAt={data.data.createdAt}
            image={data.data.image}
          />
        )}
        {/* Insight text, link card, emoticons, etc.. */}
        {/* reply etc.. */}
      </>
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
});
