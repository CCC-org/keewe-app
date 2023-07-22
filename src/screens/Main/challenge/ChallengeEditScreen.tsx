import { useQuery } from '@tanstack/react-query';
import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MainLottie from '../../../components/lotties/MainLottie';
import theme from '../../../theme/light';
import { ChallengeAPI, ChallengeQueryKeys } from '../../../utils/api/ChallengeAPI';
import ChallengeEditOption from './ChallengeEditOption';
import { dateAdd, timeConverter } from './constant';

const ChallengeEditScreen = ({ navigation }) => {
  const [myTopic, setMyTopic] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [insightPerWeek, setInsightPerWeek] = useState<number>(0);

  const { data: challengeParticipation, isLoading: isChallengeParticipationLoading } = useQuery(
    ChallengeQueryKeys.getChallengeParticipation(),
    ChallengeAPI.getChallengeParticipation,
    {
      onSuccess: (response) => {
        setMyTopic(response.myTopic);
        setDuration(response.duration);
        setInsightPerWeek(response.insightPerWeek);
      },
    },
  );

  if (isChallengeParticipationLoading) {
    return <MainLottie />;
  }

  const end = useMemo(
    () => dateAdd(challengeParticipation?.startDate ?? '', duration),
    [challengeParticipation?.startDate, duration, setDuration],
  );

  return (
    <>
      <View style={styles.Header}>
        <Text style={{ fontFamily: 'pretendardSemiBold', fontSize: 18 }}>
          {challengeParticipation?.name}
        </Text>
      </View>
      <View style={styles.SubHeader}>
        <Text
          style={{
            fontFamily: 'pretendardSemiBold',
            fontSize: 14,
            color: theme.colors.brand.onprimary.container,
          }}
        >
          {challengeParticipation?.interest}
        </Text>
      </View>
      <ChallengeEditOption
        option="나의 주제"
        value={myTopic}
        placeholder="나의 주제를 추가해주세요"
      />
      <ChallengeEditOption
        option="나의 목표"
        value={`매주 ${insightPerWeek}번 기록 x ${duration}주`}
      />
      <ChallengeEditOption
        option="챌린지 시작일"
        value={timeConverter(challengeParticipation?.startDate ?? '')}
      />
      <ChallengeEditOption option="챌린지 종료일" value={`${timeConverter(end)} 까지`} />
    </>
  );
};

export default ChallengeEditScreen;

const styles = StyleSheet.create({
  Header: {
    marginTop: 24,
    marginBottom: 10,
    marginHorizontal: 16,
  },
  SubHeader: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
});
