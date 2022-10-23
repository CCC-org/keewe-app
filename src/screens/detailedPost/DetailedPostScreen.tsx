import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import DetailedPostSection from './DetailedPostSection';
import { DetailedPostApi } from '../../utils/api/DetailedPostAPI';
import { useIncreaseView } from '../../utils/hooks/DetailedInsight/useIncreaseView';

const DetailedPostScreen = ({ navigation }) => {
  const [insightText, setInsightText] = useState('');
  const [link, setLink] = useState('');
  const [currentChallenge, setCurrentChallenge] = useState('내가 참여중인 챌린지');
  // useIncreaseView의 전달인자는 추후에 route의 id를 집어넣어야함
  const [views] = useIncreaseView(30);

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
      <View>
        <DetailedPostSection
          insightText={insightText}
          views={views}
          link={link}
          currentChallenge={currentChallenge}
        />
      </View>
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
