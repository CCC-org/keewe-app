import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { FontText } from '../../components/texts/StyledText';
import { useTheme } from 'react-native-paper';
import { Octicons } from '@expo/vector-icons';

interface DetailedPostSectionProps {
  insightText: string;
  views: number | string;
  currentChallenge: string;
}

const DetailedPostSection = ({
  insightText,
  views,
  currentChallenge,
}: DetailedPostSectionProps) => {
  const theme = useTheme();
  return (
    <View style={{ backgroundColor: '#F1F1E9' }}>
      <View style={{ ...styles.top, borderColor: `${theme.colors.graphic.black}1a` }}>
        <FontText style={{ fontSize: 16, color: `${theme.colors.graphic.black}80` }}>
          {currentChallenge}
        </FontText>
        <Pressable style={{ flexDirection: 'row' }}>
          <FontText style={{ paddingRight: 10, color: `${theme.colors.graphic.black}80` }}>
            6/12번째 기록 중
          </FontText>
          <Octicons name="chevron-right" size={17} color={`${theme.colors.graphic.black}cc`} />
        </Pressable>
      </View>
      <View style={styles.insightText}>
        <FontText style={{ fontSize: 16, lineHeight: 28 }}>{insightText}</FontText>
      </View>
      <View style={styles.link}>
        <Pressable>
          <FontText>웹소설 웹툰의 어휘가 길수록 단순하고 유치...</FontText>
          <FontText>careerly.co.kr</FontText>
        </Pressable>
      </View>
      <View style={styles.emoticonBox}>
        <FontText style={{ fontSize: 16 }}>이모티콘</FontText>
      </View>
      <View style={{ ...styles.insightView, backgroundColor: '#E1E1D0' }}>
        <FontText
          style={{ fontSize: 12, marginVertical: 9, color: `${theme.colors.graphic.black}cc` }}
        >
          {views}명이 본 인사이트
        </FontText>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
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
