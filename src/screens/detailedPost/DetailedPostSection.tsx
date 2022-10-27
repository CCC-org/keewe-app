import { Pressable, StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { Octicons } from '@expo/vector-icons';
import LinkCard from '../../components/cards/LinkCard';

interface DetailedPostSectionProps {
  insightText: string;
  views: number | string;
  currentChallenge: string;
  link: string;
}

const DetailedPostSection = ({
  insightText,
  views,
  currentChallenge,
  link,
}: DetailedPostSectionProps) => {
  const theme = useTheme();
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
      <View style={styles.insightText}>
        <Text style={theme.fonts.text.body1.regular}>{insightText}</Text>
      </View>
      <View style={styles.link}>
        {/* <Pressable>
          <FontText>웹소설 웹툰의 어휘가 길수록 단순하고 유치...</FontText>
          <FontText>careerly.co.kr</FontText>
        </Pressable> */}
        <LinkCard text={link}></LinkCard>
      </View>

      <View style={styles.emoticonBox}>
        <Text style={{ fontSize: 16 }}>이모티콘</Text>
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
});
