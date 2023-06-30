import { useQuery } from '@tanstack/react-query';
import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeaderRightButton from '../../../components/header/HeaderRightButton';
import MainLottie from '../../../components/lotties/MainLottie';
import theme from '../../../theme/light';
import { ChallengeAPI } from '../../../utils/api/ChallengeAPI';
import ChallengeEditOption from './ChallengeEditOption';
import { timeConverter } from './constant';

const ChallengeEditScreen = ({ navigation, route }) => {
  const [myTopic, setMyTopic] = useState<string>();
  const [duration, setDuration] = useState<number>();
  const [insightPerWeek, setInsightPerWeek] = useState<number>();

  const { data: challengeParticipation, isLoading: isChallengeParticipationLoading } = useQuery(
    ['challenge', 'participation'],
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

  const handleComplete = () => {
    // 업데이트 api 호출
    return;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton
          text="완료"
          backGroundColor={theme.colors.brand.primary.main}
          textColor={theme.colors.graphic.black}
          borderLine={false}
          disabled={false}
          handlePress={() => handleComplete()}
        />
      ),
    });
  }, [myTopic, duration, insightPerWeek]);

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
        navigateTo="SubjectEdit"
        params={{ currentSubject: myTopic, setSubject: setMyTopic }}
      />
      <ChallengeEditOption
        option="나의 목표"
        value={`매주 ${insightPerWeek}번 기록 x ${duration}주`}
        navigateTo="GoalEdit"
        params={{
          currentRecord: insightPerWeek,
          currentParticipation: duration,
          setRecord: setInsightPerWeek,
          setParticipation: setDuration,
        }}
      />
      <ChallengeEditOption
        option="챌린지 시작일"
        value={timeConverter(challengeParticipation?.startDate ?? '')}
      />
      <ChallengeEditOption
        option="챌린지 종료일"
        value={`${timeConverter(challengeParticipation?.endDate ?? '')} 까지`}
      />
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
