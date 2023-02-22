import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ChallengeAPI } from '../../utils/api/ChallengeAPI';
import { useQuery } from '@tanstack/react-query';
import ChallengeProfile from './challenge/ChallengeProfile';
import BottomFixButton from '../../components/buttons/BottomFixButton';
import theme from '../../theme/light';
import { SvgXml } from 'react-native-svg';
import darkChevronRightSmallXml from '../../constants/Icons/Chevrons/darkChevronRightSmallXml';
import CurrentChallengeProfile from './challenge/ChallengeProfileCurrent';

const ChallengesScreen = () => {
  // const { data: check, isLoading: isCheckLoading } = useQuery(
  //   ['challenge'],
  //   ChallengeAPI.participationCheck,
  // );

  const { data: currentChallenge, isLoading: isCurrentChallengeLoading } = useQuery(
    ['challenge'],
    ChallengeAPI.getChallenge,
  );

  const { data: challengeHistory, isLoading: isChallengeHIstoryLoading } = useQuery(
    ['challenge', { size: 3 }],
    () => ChallengeAPI.getChallengeHistory({ size: 3 }),
  );

  const { data: challengeCurrent, isLoading: isChallengeCurrentLoading } = useQuery(
    ['challenge', { size: 5 }],
    () => ChallengeAPI.getChallengeCurrent({ size: 5 }),
  );

  return (
    <ScrollView>
      {currentChallenge ? (
        <View>
          <Text
            style={{
              fontFamily: 'pretendardSemiBold',
              fontSize: 18,
              marginHorizontal: 16,
              marginTop: 24,
              marginBottom: 10,
            }}
          >
            참여중인 챌린지
          </Text>
          <View style={{ alignItems: 'center' }}>
            <Image source={require('../../../assets/images/challenge/challengeView.png')} />
          </View>
          <ChallengeProfile
            name={currentChallenge?.name ?? ''}
            participatingUserNumber={currentChallenge?.participatingUserNumber ?? 0}
            interest={currentChallenge?.interest ?? ''}
            Date={currentChallenge?.startDate ?? ''}
            highlight={true}
          />
        </View>
      ) : (
        <Image source={require('../../../assets/images/challenge/challengeEmpty.png')} />
      )}
      <BottomFixButton
        isActive={true}
        text={'새로운 챌린지 만들기'}
        width={100}
        onPress={() => alert('pressed')}
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
      />
      {!isChallengeHIstoryLoading && challengeHistory?.historyNumber !== 0 && (
        <>
          <View style={{ backgroundColor: theme.colors.brand.surface.main, ...styles.divider }} />
          <View style={styles.title}>
            <Text style={{ fontFamily: 'pretendardSemiBold', fontSize: 16 }}>종료된 첼린지</Text>
            <Text
              style={{
                fontFamily: 'pretendardSemiBold',
                fontSize: 16,
                color: `${theme.colors.graphic.black}30`,
                marginLeft: 6,
              }}
            >
              {challengeHistory?.historyNumber}
            </Text>
          </View>
          {challengeHistory?.challengeHistories?.map((history, index) => (
            <ChallengeProfile
              key={index}
              name={history.challengeName}
              interest={history.challengeCategory}
              Date={history.startDate + ' ~ ' + history.endDate}
            />
          ))}
          <View
            style={{
              ...styles.borderContainer,
              borderTopWidth: 1,
              borderColor: `${theme.colors.graphic.black}10`,
            }}
          >
            <Text style={{ fontFamily: 'pretendard', fontSize: 16, marginRight: 4 }}>전체보기</Text>
            <SvgXml xml={darkChevronRightSmallXml} />
            {/* 전체보기 페이지로 이동 */}
          </View>
        </>
      )}
      {!isChallengeCurrentLoading && challengeCurrent?.length !== 0 && (
        <>
          <View style={{ backgroundColor: theme.colors.brand.surface.main, ...styles.divider }} />
          <View style={styles.title}>
            <Text style={{ fontFamily: 'pretendardSemiBold', fontSize: 16 }}>모든 첼린지</Text>
          </View>
          {challengeCurrent?.map((current, index) => (
            <CurrentChallengeProfile
              key={index}
              name={current.challengeName}
              interest={current.challengeCategory}
              challengeDescription={current.challengeIntroduction}
              insightNumber={current.insightCount}
            />
          ))}
          <View style={{ ...styles.borderContainer }}>
            <Text style={{ fontFamily: 'pretendard', fontSize: 16, marginRight: 4 }}>전체보기</Text>
            <SvgXml xml={darkChevronRightSmallXml} />
            {/* 전체보기 페이지로 이동 */}
          </View>
        </>
      )}
      <View style={{ backgroundColor: theme.colors.brand.surface.main, ...styles.divider }} />
    </ScrollView>
  );
};

export default ChallengesScreen;

const styles = StyleSheet.create({
  button: {
    width: 'auto',
    borderRadius: 12,
    backgroundColor: '#e0f6a2',
    marginBottom: 16,
    marginHorizontal: 16,
  },
  buttonText: {
    marginTop: 6,
    color: '#486006',
  },
  divider: {
    height: 12,
  },
  title: {
    marginTop: 24,
    marginHorizontal: 16,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  borderContainer: {
    paddingVertical: 16,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
