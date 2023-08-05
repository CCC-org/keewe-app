import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ChallengeUserProfile from '../../../components/profile/ChallengeUserProfile';
import HeaderText from '../../../components/texts/HeaderText';
import theme from '../../../theme/light';
import { ChallengeAPI, ChallengeQueryKeys } from '../../../utils/api/ChallengeAPI';
import { timeConverter } from './constant';
import ConditionalButton from '../../../components/buttons/ConditionalButton';
import { navigate } from '../../../utils/hooks/navigaton/navigator';
import TwoButtonModal from '../../../components/modal/TwoButtonModal';
import { ScrollView } from 'react-native-gesture-handler';
import { useGetUserId } from '../../../utils/hooks/useGetUserId';

const ChallengeParticipationScreen = ({ route }) => {
  const { challengeId } = route.params;
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
    <>
      <ScrollView style={styles.mainContainer}>
        {!isChallengeDetailLoading && (
          <>
            <HeaderText
              header={challengeDetail?.challengeName}
              subTitle={challengeDetail?.challengeIntroduction}
            />
            <Text
              style={{
                fontFamily: 'pretendard',
                fontSize: 16,
                color: `${theme.colors.graphic.black}80`,
                marginTop: 16,
              }}
            >
              {timeConverter(challengeDetail?.createdAt ?? '')} 생성됨
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              <Text
                style={{
                  fontFamily: 'pretendard',
                  fontSize: 16,
                  color: `${theme.colors.graphic.black}80`,
                  marginRight: 4,
                }}
              >
                지금까지 모인 인사이트
              </Text>
              <Text
                style={{
                  fontFamily: 'pretendardSemiBold',
                  fontSize: 16,
                  color: `${theme.colors.brand.onprimary.container}`,
                }}
              >
                {challengeDetail?.insightCount}개
              </Text>
            </View>
          </>
        )}
        {!isCountLoading && !isCountLoading && (
          <View>
            <View style={styles.listHeader}>
              <Text
                style={{
                  fontFamily: 'pretendardSemiBold',
                  fontSize: 18,
                  color: theme.colors.graphic.black,
                  marginTop: 24,
                  marginBottom: 10,
                }}
              >
                함께 기록
              </Text>
              <Text
                style={{
                  fontFamily: 'pretendardSemiBold',
                  fontSize: 18,
                  color: `${theme.colors.graphic.black}30`,
                  marginTop: 24,
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
          </View>
        )}
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          bottom: 0,
          backgroundColor: theme.colors.graphic.white,
          paddingVertical: 10,
        }}
      >
        <ConditionalButton
          text={'참여하기'}
          color={theme.colors.brand.primary.container}
          width={180}
          textColor={theme.colors.brand.onprimary.container}
          onPress={() => setModalVisible(true)}
        />
        <ConditionalButton
          text={'둘러보기'}
          color={theme.colors.graphic.black}
          width={180}
          textColor={theme.colors.graphic.white}
          onPress={() => navigate('Challenges', {})}
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
    </>
  );
};

export default ChallengeParticipationScreen;

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 16,
    marginVertical: 10,
  },
  listHeader: {
    marginTop: 32,
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
