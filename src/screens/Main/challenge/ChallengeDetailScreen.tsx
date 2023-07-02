import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from 'react-native';
import ChallengeTitle from '../../../components/header/ChallengeTitle';
import ChallengeReaction from './ChallengeReaction';
import { useGetUserId } from '../../../utils/hooks/useGetUserId';
import { InsightAPI, InsightQueryKeys } from '../../../utils/api/InsightAPI';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import FeedItem from '../../Feed/FeedItem';
import ChallengeUserProfile from '../../../components/profile/ChallengeUserProfile';
import { ChallengeAPI, ChallengeQueryKeys } from '../../../utils/api/ChallengeAPI';
import theme from '../../../theme/light';
import { postFeedBookMark } from '../../../utils/api/FeedBookMark';
import Toast from 'react-native-toast-message';
import { FeedQueryKeys } from '../../../utils/api/FeedAPI';
import ChallengeInvite from './ChallengeInvite';
import { SvgXml } from 'react-native-svg';
import { pencil } from '../../../constants/Icons/home/pencil';
import MainLottie from '../../../components/lotties/MainLottie';

const { width } = Dimensions.get('window');

const ChallengeDetailScreen = ({ navigation, route }) => {
  const userId = useGetUserId();
  const queryClient = useQueryClient();
  const { challengeId, challengeName, interest } = route.params;
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [datas, setDatas] = useState<any[][]>([[], [], []]);
  const [pageEmpty, setPageEmpty] = useState<boolean>(false);
  const [totalCursor, setTotalCursor] = useState();
  const [myCursor, setMyCursor] = useState();
  const [friendsCursor, setFriendsCursor] = useState<number>(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={{ flexDirection: 'row' }}>
            <ChallengeInvite />
            <Pressable
              style={{ paddingRight: 19, paddingTop: 3 }}
              onPress={() => navigation.navigate('ChallengeEdit')}
            >
              <SvgXml xml={pencil} />
            </Pressable>
          </View>
        );
      },
    });
  }, []);

  const { data: TotalCount, isLoading: isTotalCountLoading } = useQuery(
    ChallengeQueryKeys.getChallengeInsightCount({}),
    () => ChallengeAPI.getChallengeInsightCount({}),
    {
      enabled: userId !== undefined,
    },
  );

  const { data: MyCount, isLoading: isMyCountLoading } = useQuery(
    ChallengeQueryKeys.getChallengeInsightCount({ writerId: String(userId) }),
    () => ChallengeAPI.getChallengeInsightCount({ writerId: String(userId) }),
    { enabled: userId !== undefined },
  );

  const { data: count, isLoading: isCountLoading } = useQuery(
    ChallengeQueryKeys.getChallengeFriendsCount({ challengeId }),
    () => ChallengeAPI.getChallengeFriendsCount({ challengeId }),
  );

  const tabs = [
    `전체기록 ${TotalCount?.insightNumber}`,
    `내기록 ${MyCount?.insightNumber}`,
    `친구 ${(count?.challengerCount ?? 0) - 1}`,
  ];
  const spacing = 16;
  const tabWidth = (width - (tabs.length + 1) * spacing) / tabs.length;
  const animatedValue = useRef(new Animated.Value(0 * (tabWidth + spacing) + spacing)).current;

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: tabIndex * (tabWidth + spacing) + spacing,
      useNativeDriver: true,
    }).start();
  }, [tabIndex]);

  const { data: challengeResponse, isLoading: challengeLoading } = useQuery(
    ChallengeQueryKeys.getChallengeMyDetail(),
    () => ChallengeAPI.getChallengeMyDetail(),
  );

  const { isLoading: isTotalListLoading, isFetching } = useQuery(
    InsightQueryKeys.getChallengeInsight({
      cursor: totalCursor,
      limit: 5,
    }),
    () =>
      InsightAPI.getChallengeInsight({
        cursor: totalCursor,
        limit: 5,
      }),
    {
      onSuccess: (response: ChallengeInsightGetResponse) => {
        setDatas((prev) => {
          const newData = [...prev];
          newData[0] = [...newData[0], ...response.data];
          return newData;
        });
      },
    },
  );

  const { isLoading: isMyListLoading } = useQuery(
    InsightQueryKeys.getChallengeInsight({
      cursor: myCursor,
      limit: 5,
      writerId: String(userId),
    }),
    () =>
      InsightAPI.getChallengeInsight({
        cursor: myCursor,
        limit: 5,
        writerId: String(userId),
      }),
    {
      onSuccess: (response: ChallengeInsightGetResponse) => {
        setDatas((prev) => {
          const newData = [...prev];
          newData[1] = [...newData[1], ...response.data];
          return newData;
        });
      },
      enabled: userId !== undefined,
    },
  );

  const { isLoading: isFriendListLoading } = useQuery(
    ChallengeQueryKeys.getChallengeFriends({ size: 6, page: friendsCursor, challengeId }),
    () => ChallengeAPI.getChallengeFriends({ size: 6, page: friendsCursor, challengeId }),
    {
      onSuccess: (response: ChallengeInsightGetResponse) => {
        setDatas((prev) => {
          const newData = [...prev];
          if (newData.length === 0) setPageEmpty(true);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          newData[2] = [...newData[2], ...response];
          return newData;
        });
      },
    },
  );

  const { mutate: touchBookMark, isLoading: bookMarkIsLoading } = useMutation(postFeedBookMark, {
    onSuccess: (data: any) => {
      Toast.show({
        type: 'snackbar',
        text1: data?.data?.bookmark ? '북마크에 저장했어요.' : '북마크에서 삭제했어요.',
        position: 'bottom',
      });
      queryClient.invalidateQueries(FeedQueryKeys.getFeed());
      return;
    },
  });

  const renderItem = ({ item, index }) => {
    if (tabIndex == 2) {
      return (
        <View key={`${tabIndex} ${index}`} style={{ marginHorizontal: 16 }}>
          <ChallengeUserProfile
            userId={item.userId}
            nickname={item.nickname}
            imageURL={item.imageURL}
            currentRecord={item.currentRecord}
            goalRecord={item.goalRecord}
            following={item.following}
          />
        </View>
      );
    }
    return (
      <View key={`${tabIndex} ${index}`} style={{ marginHorizontal: 16 }}>
        <FeedItem
          onBookMarkClick={() => {
            touchBookMark(item.id);
            item.bookmark = !item.bookmark;
            return;
          }}
          insight={item}
          localId={String(userId)}
        />
      </View>
    );
  };

  const Header = () => {
    return (
      <View style={{ marginBottom: 24, justifyContent: 'center' }}>
        <View style={styles.container}>
          <ChallengeTitle
            title={challengeName}
            category={interest}
            startDate={challengeResponse?.createdAt ?? ''}
            challengeIntroduction={challengeResponse?.challengeIntroduction ?? ''}
          />
          <ChallengeReaction challengeId={challengeId} />
        </View>
        <>
          <View style={{ ...styles.tabContainer, borderColor: `${theme.colors.graphic.black}10` }}>
            {!isTotalCountLoading &&
              !isMyCountLoading &&
              tabs.map((tab, index) => (
                <TouchableOpacity
                  key={index}
                  disabled={index === tabIndex}
                  style={[
                    styles.tab,
                    {
                      width: tabWidth,
                      marginRight: index === tabs.length - 1 ? 0 : spacing,
                    },
                  ]}
                  onPress={() => {
                    queryClient.invalidateQueries(['insight', 'challenge']);
                    if (index !== 2) {
                      setDatas((prev) => {
                        prev[index] = [];
                        return prev;
                      });
                      if (index == 0) {
                        setTotalCursor(undefined);
                      } else {
                        setMyCursor(undefined);
                      }
                    }
                    setTabIndex(index);
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'pretendardSemiBold',
                      fontSize: 14,
                      color:
                        index === tabIndex
                          ? theme.colors.graphic.black
                          : `${theme.colors.graphic.black}50`,
                    }}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
          <Animated.View
            style={[
              styles.highlight,
              {
                backgroundColor: theme.colors.brand.primary.main,
                transform: [{ translateX: animatedValue }],
                width: tabWidth,
              },
            ]}
          />
        </>
      </View>
    );
  };

  const onEndReached = () => {
    if (tabIndex == 2) {
      if (pageEmpty) return;
      setFriendsCursor((prev) => {
        return prev + 1;
      });
    } else {
      if (datas[tabIndex]) {
        if (tabIndex == 0) {
          setTotalCursor((prev) => {
            prev = datas[tabIndex][datas[tabIndex].length - 1]?.id;
            return prev;
          });
        } else {
          setMyCursor((prev) => {
            prev = datas[tabIndex][datas[tabIndex].length - 1]?.id;
            return prev;
          });
        }
      }
    }
  };

  return (
    <FlatList
      data={datas[tabIndex]}
      renderItem={renderItem}
      ListHeaderComponent={<Header />}
      ListEmptyComponent={isFetching ? <MainLottie /> : null}
      onEndReached={onEndReached}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    position: 'relative',
    justifyContent: 'center',
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  highlight: {
    position: 'absolute',
    bottom: 0,
    height: 2,
  },
});

export default ChallengeDetailScreen;
