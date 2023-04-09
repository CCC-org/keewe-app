import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import ChallengeTitle from '../../../components/header/ChallengeTitle';
import ChallengeReaction from './ChallengeReaction';
import { useGetUserId } from '../../../utils/hooks/useGetUserId';
import { InsightAPI, InsightQueryKeys } from '../../../utils/api/InsightAPI';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import FeedItem from '../../Feed/FeedItem';
import ChallengeUserProfile from '../../../components/profile/ChallengeUserProfile';
import { ChallengeAPI, ChallengeQueryKeys } from '../../../utils/api/ChallengeAPI';
import theme from '../../../theme/light';

const { width } = Dimensions.get('window');

const ChallengeDetailScreen = ({ navigation, route }) => {
  const { challengeId, challengeName, interest } = route.params;
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [datas, setDatas] = useState<any[][]>([[], [], []]);
  const [cursors, setCursors] = useState<any[]>([undefined, undefined, 0]);
  const [pageEmpty, setPageEmpty] = useState<boolean>(false);
  const tabs = ['전체기록', '내기록', '친구'];
  const spacing = 16;
  const tabWidth = (width - (tabs.length + 1) * spacing) / tabs.length;
  const animatedValue = useRef(new Animated.Value(0 * (tabWidth + spacing) + spacing)).current;

  useEffect(() => {
    console.log(tabIndex * (tabWidth + spacing) + spacing);
    Animated.spring(animatedValue, {
      toValue: tabIndex * (tabWidth + spacing) + spacing,
      useNativeDriver: true,
    }).start();
  }, [tabIndex]);

  const userId = useGetUserId();
  const queryClient = useQueryClient();

  const { data: challengeResponse, isLoading: challengeLoading } = useQuery(
    ChallengeQueryKeys.getChallengeMyDetail(),
    () => ChallengeAPI.getChallengeMyDetail(),
  );

  const { isLoading: isTotalListLoading } = useQuery(
    InsightQueryKeys.getChallengeInsight({
      cursor: cursors[0],
      limit: 5,
      writerId: undefined,
    }),
    () =>
      InsightAPI.getChallengeInsight({
        cursor: cursors[0],
        limit: 5,
        writerId: undefined,
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
      cursor: cursors[1],
      limit: 5,
      writerId: String(userId),
    }),
    () =>
      InsightAPI.getChallengeInsight({
        cursor: cursors[1],
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
    },
  );

  const { isLoading: isFriendListLoading } = useQuery(
    ChallengeQueryKeys.getChallengeFriends({ size: 6, page: cursors[2], challengeId }),
    () => ChallengeAPI.getChallengeFriends({ size: 6, page: cursors[2], challengeId }),
    {
      onSuccess: (response: ChallengeInsightGetResponse) => {
        setDatas((prev) => {
          const newData = [...prev];
          if (newData.length === 0) setPageEmpty(true);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          newData[2] = [...newData[2], ...response];
          // console.log(newData[2]);
          return newData;
        });
      },
    },
  );

  const { data: TotalCount, isLoading: isTotalCountLoading } = useQuery(
    ChallengeQueryKeys.getChallengeInsightCount({}),
    () => ChallengeAPI.getChallengeInsightCount({}),
  );

  const { data: MyCount, isLoading: isMyCountLoading } = useQuery(
    ChallengeQueryKeys.getChallengeInsightCount({ writerId: String(userId) }),
    () => ChallengeAPI.getChallengeInsightCount({ writerId: String(userId) }),
  );

  const renderItem = ({ item, index }) => {
    if (tabIndex == 2) {
      return (
        <View key={`${tabIndex} ${index}`} style={{ marginHorizontal: 16 }}>
          <ChallengeUserProfile
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
        {/* <Tab
          tabs={[
            `전체기록 ${TotalCount?.insightNumber ?? '-'}`,
            `내기록 ${MyCount?.insightNumber ?? '-'}`,
            '친구',
          ]}
          selectedTab={tabIndex}
          prevTab={prevIndex}
          spacing={16}
          setSelectedTab={(v) => {
            queryClient.invalidateQueries(['insight', 'challenge']);
            if (v !== 2) {
              setDatas((prev) => {
                prev[v] = [];
                return prev;
              });
              setCursors((prev) => {
                prev[v] = undefined;
                return prev;
              });
            }
            setTabIndex(v);
          }}
          setPrevTab={setPrevIndex}
        /> */}
        <>
          <View style={{ ...styles.tabContainer, borderColor: `${theme.colors.graphic.black}10` }}>
            {tabs.map((tab, index) => (
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
                    setCursors((prev) => {
                      prev[index] = undefined;
                      return prev;
                    });
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
      setCursors((prev) => {
        prev[tabIndex] += 1;
        return prev;
      });
    } else {
      setCursors((prev) => {
        prev[tabIndex] = datas[tabIndex][datas[tabIndex].length - 1].id;
        return prev;
      });
    }
  };

  return (
    <FlatList
      data={datas[tabIndex]}
      renderItem={renderItem}
      ListHeaderComponent={<Header />}
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
