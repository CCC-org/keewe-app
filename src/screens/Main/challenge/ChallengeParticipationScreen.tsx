import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import ChallengeUserProfile from '../../../components/profile/ChallengeUserProfile';
import HeaderText from '../../../components/texts/HeaderText';
import { ChallengeAPI, ChallengeQueryKeys } from '../../../utils/api/ChallengeAPI';
import ConditionalButton from '../../../components/buttons/ConditionalButton';
import { navigate } from '../../../utils/hooks/navigaton/navigator';
import TwoButtonModal from '../../../components/modal/TwoButtonModal';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';
import StatisticsReactionCountInfo from '../../statistics/StatisticsReactionCountInfo';
import reaction from '../../../../assets/svgs/StatisticIcon/reaction';
import comment from '../../../../assets/svgs/StatisticIcon/comment';
import bookmark from '../../../../assets/svgs/StatisticIcon/bookmark';
import insights from '../../../../assets/svgs/StatisticIcon/insights';

const ChallengeParticipationScreen = ({ route }) => {
  const theme = useTheme();
  const { challengeId, interest } = route.params;
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const { data: challengeDetail, isLoading: isChallengeDetailLoading } = useQuery(
    ChallengeQueryKeys.getChallengeDetail({ challengeId }),
    () => ChallengeAPI.getChallengeDetail({ challengeId }),
  );

  const { data: friendsList, isLoading: isListLoading } = useQuery(
    ChallengeQueryKeys.getChallengeFriends({ size: 6, challengeId }),
    () => ChallengeAPI.getChallengeFriends({ size: 6, challengeId }),
  );
  const { data: count, isLoading: isCountLoading } = useQuery(
    ChallengeQueryKeys.getChallengeFriendsCount({ challengeId }),
    () => ChallengeAPI.getChallengeFriendsCount({ challengeId }),
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.mainContainer}>
        {!isChallengeDetailLoading && (
          <>
            <HeaderText
              header={challengeDetail?.challengeName}
              subTitle={challengeDetail?.challengeIntroduction}
              interest={interest}
            />
          </>
        )}
        <View
          style={{
            backgroundColor: theme.colors.brand.surface.main,
            ...styles.statisticsContainer,
          }}
        >
          <Text style={{ ...theme.fonts.text.caption1, color: `${theme.colors.graphic.black}cc` }}>
            누적 챌린지 통계
          </Text>
          <View style={styles.statisticsIconsArea}>
            <StatisticsReactionCountInfo
              xml={insights}
              count={challengeDetail?.insightCount ?? 0}
            />
            <StatisticsReactionCountInfo xml={reaction} count={0} />
            <StatisticsReactionCountInfo xml={comment} count={0} />
            <StatisticsReactionCountInfo xml={bookmark} count={0} />
          </View>
        </View>
        {!isCountLoading && !isCountLoading && (
          <>
            <View style={styles.listHeader}>
              <Text
                style={{
                  ...theme.fonts.text.headline2,
                  color: theme.colors.graphic.black,
                  marginBottom: 10,
                }}
              >
                함께 기록
              </Text>
              <Text
                style={{
                  ...theme.fonts.text.headline2,
                  color: `${theme.colors.graphic.black}4d`,
                  marginBottom: 10,
                  marginLeft: 6,
                }}
              >
                {count?.challengerCount}
              </Text>
            </View>
            <View>
              {friendsList?.map((item, idx) => {
                return (
                  <ChallengeUserProfile
                    key={idx}
                    userId={item.userId}
                    nickname={item.nickname}
                    imageURL={item.imageURL}
                    currentRecord={item.currentRecord}
                    goalRecord={item.goalRecord}
                    following={item.following}
                  />
                );
              })}
            </View>
          </>
        )}
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          bottom: 0,
          backgroundColor: theme.colors.graphic.white,
          paddingVertical: 10,
        }}
      >
        <ConditionalButton
          text={'둘러보기'}
          color={theme.colors.brand.primary.container}
          width={180}
          textColor={theme.colors.brand.onprimary.container}
          onPress={() => navigate('Challenges', {})}
        />
        <ConditionalButton
          text={'참여하기'}
          color={theme.colors.graphic.black}
          width={180}
          textColor={theme.colors.graphic.white}
          onPress={() => setModalVisible(true)}
        />
      </View>
      <TwoButtonModal
        dismissable={false}
        mainTitle={'챌린지에 참여할까요?'}
        subTitle={challengeDetail?.challengeName}
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        leftButtonText={'취소'}
        rightButtonText={'참여하기'}
        leftButtonPress={() => setModalVisible(false)}
        rightButtonPress={() => {
          navigate('ChallengeJoin', { ...route.params });
          setModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
};

export default ChallengeParticipationScreen;

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 16,
    marginVertical: 10,
  },
  statisticsContainer: {
    alignItems: 'center',
    marginVertical: 24,
    borderWidth: 1,
    borderColor: '#1213141a',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  statisticsIconsArea: {
    width: '75%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listHeader: {
    flexDirection: 'row',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  btn: {
    position: 'absolute',
    bottom: 36,
    left: 0,
    right: 0,
    margin: 'auto',
  },
});
