import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { Octicons } from '@expo/vector-icons';
import LinkCard from '../../components/cards/LinkCard';
import { REACTIONS } from './constant';
import ReactIconButton from '../../components/emoticons/ReactIconButton';
import { useMutation, useQueryClient } from 'react-query';
import { InsightAPI } from '../../utils/api/InsightAPI';

interface DetailedPostSectionProps {
  insightText: string;
  views: number | string;
  currentChallenge: string;
  link: string;
  reaction: Reaction;
}

const DetailedPostSection = ({
  insightText,
  views,
  currentChallenge,
  link,
  reaction,
}: DetailedPostSectionProps) => {
  const theme = useTheme();
  const queryClient = useQueryClient();

  const { mutate: insightReact } = useMutation(InsightAPI.react, {
    onSuccess: () => {
      queryClient.invalidateQueries('list');
    },
  });

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
        <Text style={[theme.fonts.text.body1.regular, { lineHeight: 28 }]}>{insightText}</Text>
      </View>
      <View style={styles.link}>
        {/* <Pressable>
          <Text>웹소설 웹툰의 어휘가 길수록 단순하고 유치...</Text>
          <Text>careerly.co.kr</Text>
        </Pressable> */}
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
                onClick={() => {
                  insightReact({ insightId: 2, reactionType: react.name, value: 1 });
                }}
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
