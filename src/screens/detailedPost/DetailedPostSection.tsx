import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { Octicons } from '@expo/vector-icons';
import LinkCard from '../../components/cards/LinkCard';
import { REACTIONS } from './constant';
import ReactIconButton from '../../components/emoticons/ReactIconButton';
import { useNavigation } from '@react-navigation/native';

interface DetailedPostSectionProps {
  insightText: string;
  insightId: number;
  views: number | string;
  currentChallenge: string;
  link: string;
  reaction: Reaction;
}

const DetailedPostSection = ({
  insightText,
  insightId,
  views,
  currentChallenge,
  link,
  reaction,
}: DetailedPostSectionProps) => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <View style={{ backgroundColor: '#F1F1E9' }}>
      <View style={{ ...styles.top, borderColor: `${theme.colors.graphic.black}1a` }}>
        <Text style={{ ...theme.fonts.text.caption1, color: `${theme.colors.graphic.black}80` }}>
          {currentChallenge}
        </Text>
        <Pressable style={{ flexDirection: 'row' }}>
          <Text
            style={{
              ...theme.fonts.text.caption1,
              paddingRight: 10,
              color: `${theme.colors.graphic.black}80`,
            }}
          >
            6/12번째 기록 중
          </Text>
          <Octicons name="chevron-right" size={17} color={`${theme.colors.graphic.black}cc`} />
        </Pressable>
      </View>
      {/* 여기는 글 작성자의 프로필과 대표타이틀, 팔로워, 관심사등이 올라갈 부분. 임시적으로 팔로워, 팔로잉 페이지로 이동하는 버튼 만듦 */}
      <Pressable
        onPress={() => {
          // 지금은 임시적인 버튼이지만, 나중에는 글쓴이의 팔로우, 팔로잉 숫자에 붙어있을 navigate 함수임.
          navigation.navigate('FollowTopTabs');
        }}
      >
        <Text>팔로우 팔로잉 페이지로 이동</Text>
      </Pressable>
      <View style={styles.insightText}>
        <Text style={[theme.fonts.text.body1.regular, { lineHeight: 28 }]}>{insightText}</Text>
      </View>
      <View style={styles.link}>
        <LinkCard text={link}></LinkCard>
      </View>
      <View style={styles.emoticonBox}>
        <ScrollView horizontal style={{ overflow: 'visible' }}>
          <View style={{ ...styles.ReactionBar }}>
            {REACTIONS.map((react) => (
              <ReactIconButton
                key={react.reaction}
                xml={react.xml}
                color={react.color}
                taps={reaction[react.reaction]}
                name={react.name}
                insightId={insightId}
              />
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={{ ...styles.insightView, backgroundColor: '#E1E1D0' }}>
        <Text
          style={{
            ...theme.fonts.text.caption1,
            marginVertical: 9,
            color: `${theme.colors.graphic.black}cc`,
          }}
        >
          {views}명이 본 인사이트
        </Text>
      </View>
    </View>
  );
};

export default DetailedPostSection;

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 13,
    marginHorizontal: 16,
    borderBottomWidth: 1,
  },
  insightText: {
    marginHorizontal: 28,
    marginVertical: 24,
  },
  link: {
    marginHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  emoticonBox: {
    marginTop: 16,
    marginBottom: 24,
    marginHorizontal: 16,
  },
  insightView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  ReactionBar: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    height: 70,
    width: 'auto',
  },
});
