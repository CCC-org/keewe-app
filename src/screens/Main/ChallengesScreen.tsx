import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { IOScrollView } from 'react-native-intersection-observer';
import { ChallengeAPI, ChallengeQueryKeys } from '../../utils/api/ChallengeAPI';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ChallengeProfile from '../../components/profile/ChallengeProfile';
import BottomFixButton from '../../components/buttons/BottomFixButton';
import theme from '../../theme/light';
import { SvgXml } from 'react-native-svg';
import CurrentChallengeProfile from '../../components/profile/ChallengeProfileCurrent';
import { timeConverter } from './challenge/constant';
import TwoButtonModal from '../../components/modal/TwoButtonModal';
import { useFocusEffect } from '@react-navigation/native';
import MainTabHeader from '../../components/header/MainTabHeader';
import { notificationKeys } from '../../utils/api/notification/notification';
import { rightXml } from '../../../assets/svgs/rightXml';
import ChallengeParticipationView from '../../components/challenge/ChallengeParticipationView';
import { UserSpecificChallenge } from '../../types/Feed/UserSpecificChallenge';
import {
  UserSpecificChallengeAPI,
  UserSpecificChallengeQueryKeys,
} from '../../utils/api/UserSpecificChallenge';

const ChallengesScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [participated, setParticipated] = useState<boolean>(false);
  const [pageRefreshing, setPageRefreshing] = useState(false);
  const hideModal = () => setModalVisible(false);
  const queryClient = useQueryClient();

  const scrollViewRef = useRef<any>(null);

  const { data: participationCheck } = useQuery(
    ChallengeQueryKeys.getParticipationCheck(),
    () => ChallengeAPI.getParticipationCheck(),
    { onSuccess: () => setParticipated(true) },
  );

  const { data: challengeParticipation } = useQuery(
    ChallengeQueryKeys.getChallengeParticipation(),
    ChallengeAPI.getChallengeParticipation,
    { enabled: participated },
  );

  const { data: challengeCurrent, isLoading: isChallengeCurrentLoading } = useQuery(
    ChallengeQueryKeys.getChallengeCurrent({ limit: 5 }),
    () => ChallengeAPI.getChallengeCurrent({ limit: 5 }),
  );

  const { data: challengeHistory, isLoading: isChallengeHIstoryLoading } = useQuery(
    ChallengeQueryKeys.getChallengeHistory({ limit: 5 }),
    () => ChallengeAPI.getChallengeHistory({ limit: 3 }),
  );

  const { data: challengeHistoryCount, isLoading: isChallengeHIstoryCountLoading } = useQuery(
    ChallengeQueryKeys.getChallengeHistoryCount(),
    () => ChallengeAPI.getChallengeHistoryCount(),
  );

  const { data: userSpecificChallenge } = useQuery<UserSpecificChallenge['data'] | undefined>({
    queryKey: UserSpecificChallengeQueryKeys.getUserSpecificChallenge(),
    queryFn: () => UserSpecificChallengeAPI.getUserSpecificChallenge(),
  });

  const onRefresh = () => {
    setPageRefreshing(true);
    queryClient.invalidateQueries(notificationKeys.checkNotification());
    queryClient.invalidateQueries(['challenge']).then(() => setPageRefreshing(false));
  };

  useFocusEffect(
    useCallback(() => {
      setParticipated(false);
      queryClient.invalidateQueries(['challenge']);
      queryClient.invalidateQueries(notificationKeys.checkNotification());
    }, []),
  );

  const participatingChallengeName = challengeParticipation?.name
    ? challengeParticipation.name.length > 20
      ? challengeParticipation.name + '...'
      : challengeParticipation.name
    : '';

  const thisWeekDoneCount = userSpecificChallenge?.dayProgresses.filter((cur) => {
    return cur.check;
  }).length;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <IOScrollView
        ref={scrollViewRef}
        refreshControl={<RefreshControl refreshing={pageRefreshing} onRefresh={onRefresh} />}
      >
        <MainTabHeader text="챌린지" />
        <TwoButtonModal
          dismissable={false}
          mainTitle={'새로운 챌린지를 만들까요?'}
          subTitle={
            '한 번에 하나의 챌린지에만 참여할 수 있어요.\n 현재 참여 중인 챌린지는 자동 탈퇴됩니다.'
          }
          visible={modalVisible}
          onDismiss={hideModal}
          leftButtonText={'취소'}
          rightButtonText={'만들러 가기'}
          leftButtonPress={() => setModalVisible(false)}
          rightButtonPress={() => {
            setModalVisible(false);
            navigation.navigate('CategorySelect');
          }}
        />
        {participationCheck?.participation ? (
          <View style={{ marginHorizontal: 16 }}>
            <View style={styles.headerCtn}>
              <Text style={theme.fonts.text.headline2}>참여중인 챌린지</Text>
              <Pressable
                onPress={() =>
                  navigation.navigate('ChallengeDetail', {
                    challengeId: challengeParticipation?.challengeId ?? 0,
                    challengeName: challengeParticipation?.name ?? '',
                    interest: challengeParticipation?.interest ?? '',
                  })
                }
                hitSlop={{
                  left: 50,
                  right: 20,
                }}
              >
                <SvgXml xml={rightXml} width={28} />
              </Pressable>
            </View>
            <Text
              style={{
                ...theme.fonts.text.body1.regular,
                color: theme.colors.brand.onprimary.container,
              }}
            >
              {participatingChallengeName}
            </Text>
            <ChallengeParticipationView
              current={thisWeekDoneCount}
              insightPerWeek={challengeParticipation?.insightPerWeek ?? 0}
              startDate={challengeParticipation?.startDate ?? ''}
              endDate={challengeParticipation?.endDate ?? ''}
              dayProgresses={userSpecificChallenge?.dayProgresses}
            />
          </View>
        ) : (
          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <Image
              style={{ width: 343, height: 140 }}
              source={require('../../../assets/images/challenge/ChallengeEmpty.png')}
            />
            <Text
              style={{
                ...theme.fonts.text.body1.regular,
                marginTop: 20,
                color: `${theme.colors.graphic.black}80`,
              }}
            >
              챌린지에 참여해보세요.
            </Text>
          </View>
        )}
        <BottomFixButton
          isActive={true}
          text={'새로운 챌린지 만들기'}
          width={100}
          onPress={() => {
            if (participationCheck?.participation) setModalVisible(true);
            else navigation.navigate('CategorySelect');
          }}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
        {!isChallengeHIstoryCountLoading && challengeHistoryCount?.count !== 0 && (
          <>
            <View style={{ backgroundColor: theme.colors.brand.surface.main, ...styles.divider }} />
            <View style={styles.title}>
              <Text style={{ ...theme.fonts.text.body1.bold, marginBottom: 14 }}>
                참여했던 챌린지
              </Text>
              <Text
                style={{
                  ...theme.fonts.text.body1.bold,
                  color: `${theme.colors.graphic.black}4d`,
                  marginLeft: 6,
                }}
              >
                {challengeHistoryCount?.count}
              </Text>
            </View>
            {!isChallengeHIstoryLoading &&
              challengeHistory?.map((history, index) => (
                <ChallengeProfile
                  key={index}
                  challengeId={history.challengeId}
                  name={history.challengeName}
                  interest={history.challengeCategory}
                  Date={timeConverter(history.startDate + ' ~ ' + history.endDate)}
                  participate={challengeParticipation?.challengeId === history.challengeId}
                />
              ))}
            <Pressable
              onPress={() =>
                navigation.navigate('ChallengeHistory', {
                  currentChallenge: challengeParticipation?.challengeId,
                })
              }
              style={{ ...styles.borderContainer }}
            >
              <Text style={{ ...theme.fonts.text.body1.regular, marginRight: 4 }}>전체보기</Text>
            </Pressable>
          </>
        )}
        {!isChallengeCurrentLoading && challengeCurrent?.length !== 0 && (
          <>
            <View style={{ backgroundColor: theme.colors.brand.surface.main, ...styles.divider }} />
            <View style={styles.title}>
              <Text style={{ ...theme.fonts.text.body1.bold, marginBottom: 14 }}>모든 챌린지</Text>
            </View>
            {challengeCurrent?.map((current, index) => (
              <CurrentChallengeProfile
                key={index}
                challengeId={current.challengeId}
                name={current.challengeName}
                interest={current.challengeCategory}
                challengeDescription={current.challengeIntroduction}
                insightNumber={current.insightCount}
                participate={challengeParticipation?.challengeId === current.challengeId}
              />
            ))}
            <Pressable
              onPress={() =>
                navigation.navigate('ChallengeCurrent', {
                  currentChallenge: challengeParticipation?.challengeId,
                })
              }
              style={{ ...styles.borderContainer }}
            >
              <Text style={{ ...theme.fonts.text.body1.regular, marginRight: 4 }}>전체보기</Text>
            </Pressable>
          </>
        )}
        <View style={{ backgroundColor: theme.colors.brand.surface.main, ...styles.divider }} />
      </IOScrollView>
    </SafeAreaView>
  );
};

export default ChallengesScreen;

const styles = StyleSheet.create({
  headerCtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  button: {
    width: 'auto',
    borderRadius: 12,
    backgroundColor: '#FF9417',
    marginBottom: 16,
    marginHorizontal: 16,
  },
  buttonText: {
    color: '#ffffff',
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
    borderTopWidth: 1,
    borderTopColor: '#1213141a',
  },
});
