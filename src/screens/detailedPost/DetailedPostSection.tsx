import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from 'react-native-paper';
import { Octicons } from '@expo/vector-icons';
import LinkCard from '../../components/cards/LinkCard';
import { REACTIONS } from './constant';
import ReactIconButton from '../../components/emoticons/ReactIconButton';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import barChart from '../../../assets/svgs/StatisticIcon/barChart';
import { useGetUserId } from '../../utils/hooks/useGetUserId';
import { ChallengeAPI, ChallengeQueryKeys } from '../../utils/api/ChallengeAPI';
import { useQuery } from '@tanstack/react-query';

interface DetailedPostSectionProps {
  isProfileLoading: boolean;
  insightText: string;
  insightId: number;
  views: number | string;
  currentChallenge?: string;
  challengeId?: number;
  recordText?: string;
  url: string;
  reaction: Reaction;
  authorId: number;
  isInsightLoading: boolean;
  contents: string;
  userName: string;
  createdAt: string;
}

const DetailedPostSection = ({
  insightText,
  insightId,
  views,
  currentChallenge,
  challengeId,
  recordText,
  url,
  reaction,
  authorId,
  contents,
  isProfileLoading,
  isInsightLoading,
  userName,
  createdAt,
}: DetailedPostSectionProps) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [participated, setParticipated] = useState<boolean>(false);
  const userId = useGetUserId();

  const { data: participationCheck } = useQuery(
    ChallengeQueryKeys.getParticipationCheck(),
    () => ChallengeAPI.getParticipationCheck(),
    { onSuccess: () => setParticipated(true) },
  );

  const { data: challengeParticipation, isLoading: isChallengeParticipationLoading } = useQuery(
    ChallengeQueryKeys.getChallengeParticipation(),
    ChallengeAPI.getChallengeParticipation,
    { enabled: participated },
  );

  const handleNaviateToStatistics = () => {
    if (userId === authorId)
      navigation.navigate('Statistics', {
        userId: authorId,
        insightId,
        insightTitle: title,
        insightContent: description,
        nickname: userName,
        date: createdAt,
        content: contents,
      });
  };

  const handleGoToDetailedChallenge = () => {
    if (challengeParticipation?.name !== currentChallenge) {
      return navigation.navigate('ChallengeParticipation', {
        challengeId,
        challengeName: currentChallenge,
      });
    }
    navigation.navigate('ChallengeDetail', {
      challengeId,
      challengeName: currentChallenge,
    });
  };

  return (
    <View style={{ backgroundColor: '#F1F1E9' }}>
      {currentChallenge && (
        <Pressable
          onPress={handleGoToDetailedChallenge}
          style={{
            ...styles.top,
            borderColor: `${theme.colors.graphic.black}1a`,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              ...theme.fonts.text.caption1,
              flex: 1,
              color: `${theme.colors.graphic.black}80`,
              overflow: 'hidden',
              flexWrap: 'nowrap',
            }}
          >
            {isInsightLoading || isProfileLoading ? '-' : currentChallenge}
          </Text>
          <Text
            style={{
              ...theme.fonts.text.caption1,
              paddingRight: 10,
              color: `${theme.colors.graphic.black}80`,
            }}
          >
            {isInsightLoading || isProfileLoading
              ? '--'
              : recordText?.length
              ? `${recordText}번째 기록중`
              : ''}
          </Text>
          <Octicons name="chevron-right" size={17} color={`${theme.colors.graphic.black}cc`} />
        </Pressable>
      )}
      <View style={[styles.insightText]}>
        <Text style={[theme.fonts.text.body1.regular, { color: '#121314CC', lineHeight: 28 }]}>
          {isInsightLoading || isProfileLoading ? contents : insightText}
        </Text>
      </View>
      <View style={styles.link}>
        <LinkCard text={url} setTitle={setTitle} setDescription={setDescription} />
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
      <Pressable
        onPress={() => {
          handleNaviateToStatistics();
        }}
        style={{ ...styles.insightView, backgroundColor: '#E1E1D0' }}
      >
        {userId === authorId ? (
          <View style={{ flexDirection: 'row' }}>
            <SvgXml xml={barChart} style={{ marginRight: 8 }} />
            <Text
              style={{
                fontFamily: 'pretendardSemiBold',
                color: theme.colors.brand.onprimary.container,
              }}
            >
              이 글의 통계
            </Text>
          </View>
        ) : (
          <View />
        )}
        <Text
          style={{
            ...theme.fonts.text.caption1,
            color: `${theme.colors.graphic.black}cc`,
          }}
        >
          {views}명이 본 인사이트
        </Text>
      </Pressable>
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
    marginBottom: 8,
    marginHorizontal: 16,
  },
  insightView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  ReactionBar: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 12,
    width: 'auto',
  },
});
