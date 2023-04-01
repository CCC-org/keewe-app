import { StyleSheet, Text, View, ScrollView, Pressable, RefreshControl } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MypageProfile from '../../../components/profile/MypageProfile';
import { useTheme } from 'react-native-paper';
import { Feather, Ionicons } from '@expo/vector-icons';
import MypageTitle from '../../../components/title/MypageTitle';
import DividerBar from '../../../components/bars/DividerBar';
import InterestIcon from './InterestIcon';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MypageAPI, MypageQueryKeys, TabInfo } from '../../../utils/api/mypageAPI';
import { querySuccessError } from '../../../utils/helper/queryReponse/querySuccessError';
import FolderOption from './FolderOption';
import { useInfiniteFeed } from '../../../utils/hooks/feedInifiniteScroll/useInfiniteFeed';
import FeedList from '../../Feed/FeedList';
import BottomFixButton from '../../../components/buttons/BottomFixButton';
import { IOScrollView } from 'react-native-intersection-observer';
import { FollowAPI } from '../../../utils/api/FollowAPI';
import MainLottie from '../../../components/lotties/MainLottie';
//import RNFadedScrollView from 'rn-faded-scrollview';

const ProfileScreen = ({ navigation, route }) => {
  const { userId } = route.params;
  if (userId === null || userId === undefined) {
    alert('userId를 인식할 수 없었습니다.');
    return null;
  }
  const theme = useTheme();

  const [profileImage, setProfileImage] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<Record<string, string>[]>([]);
  const [representativeTitleList, setRepresentativeTitleList] = useState<AchievedTitle[]>([]);
  const [titleTotal, setTitleTotal] = useState<number>(0);
  const [iconColor, setIconColor] = useState([
    [theme.colors.graphic.purple, `${theme.colors.graphic.purple}1a`],
    [theme.colors.graphic.sky, `${theme.colors.graphic.sky}1a`],
    [theme.colors.graphic.hotpink, `${theme.colors.graphic.hotpink}1a`],
    [theme.colors.graphic.violet, `${theme.colors.graphic.violet}1a`],
    [theme.colors.graphic.green, `${theme.colors.graphic.green}1a`],
  ]);

  // Erased onSetteled: querySuccessError fn.
  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: MypageQueryKeys.getProfile({ targetId: userId }),
    queryFn: () => MypageAPI.getProfile({ targetId: userId }),
    refetchInterval: 1000 * 120,
  });

  const { data: representativeTitles, isLoading: isrepresentativeTitlesLoading } = useQuery(
    MypageQueryKeys.getRepresentativeTitles({ userId: userId }),
    () => MypageAPI.getRepresentativeTitles({ userId: userId }),
    querySuccessError,
  );

  const { data: userFolderList, isLoading: isUserFolderListLoading } = useQuery(
    MypageQueryKeys.getFolderList({ userId: userId }),
    () => MypageAPI.getFolderList({ userId: userId }),
    querySuccessError,
  );

  const queryClient = useQueryClient();
  const drawerId =
    isUserFolderListLoading === true || userFolderList.selectedTab.id === 0
      ? ''
      : String(userFolderList.selectedTab.id);
  const { feedList, feedListIsLoading, touchBookMark, fetchNextPage, feedListQueryClient } =
    useInfiniteFeed(
      'https://api-keewe.com/api/v1/insight/my-page/' + userId + '?drawerId=' + drawerId,
    );

  const scrollViewRef = useRef<any>(null);
  const [pageRefreshing, setPageRefreshing] = useState(false);
  const onRefresh = () => {
    setPageRefreshing(true);
    feedListQueryClient.invalidateQueries(MypageQueryKeys.getProfile({ targetId: userId }));
    feedListQueryClient.invalidateQueries(
      MypageQueryKeys.getRepresentativeTitles({ userId: userId }),
    );
    feedListQueryClient.invalidateQueries(MypageQueryKeys.getFolderList({ userId: userId }));
    feedListQueryClient
      .invalidateQueries(MypageQueryKeys.getFolderInsight(drawerId, userId))
      .then(() => setPageRefreshing(false));
  };

  const followMutation = useMutation({
    mutationFn: () => FollowAPI.follow(userId),
    onMutate: async () => {
      const key = MypageQueryKeys.getProfile({ targetId: userId });
      await queryClient.cancelQueries({ queryKey: key });
      // Snapshot the previous value
      const prevState = queryClient.getQueryData<any>(key);
      // Optimistically update to the new value
      queryClient.setQueryData(key, (old: any) => {
        const newProfile = {
          ...old,
          data: {
            ...old.data,
            follow: !old.data.follow,
          },
        };

        return newProfile;
      });

      // Return a context object with the snapshotted value
      return { prevState };
    },

    onError: (err, variables, context) => {
      console.log('profile mutate err');
      const key = MypageQueryKeys.getProfile({ targetId: userId });
      queryClient.setQueryData(key, context?.prevState);
    },
  });

  followMutation.mutate;

  useEffect(() => {
    setSelectedCategory(profile?.data?.interests ?? []);
    setProfileImage(profile?.data?.image ?? '');
    setRepresentativeTitleList(representativeTitles?.data?.achievedTitles ?? []);
    setTitleTotal(representativeTitles?.data?.total ?? 0);
  }, [
    profile,
    isProfileLoading,
    representativeTitles,
    isrepresentativeTitlesLoading,
    userFolderList,
    isUserFolderListLoading,
  ]);

  const handleFolderOption = (tabId: number) => {
    const key = MypageQueryKeys.getFolderList({ userId: userId });
    const data = queryClient.getQueryState(key)!.data as TabInfo;
    const newTabs = data.tabs.map((tab) => {
      return {
        ...tab,
        isClicked: false,
      };
    });
    for (const tab of newTabs) {
      if (tab.id === tabId) {
        tab.isClicked = true;
      }
    }
    const newSelectedTab = newTabs.find((tab) => tab.id === tabId);
    queryClient.setQueryData(key, {
      tabs: newTabs,
      selectedTab: newSelectedTab,
    });
  };

  if (isProfileLoading || isrepresentativeTitlesLoading) {
    return <MainLottie />;
  }

  return (
    <IOScrollView
      ref={scrollViewRef}
      refreshControl={<RefreshControl refreshing={pageRefreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.top}>
        <View style={{ marginLeft: 16, marginBottom: 24 }}>
          <MypageProfile
            profileUserId={userId}
            nickname={profile?.data?.nickname ?? ''}
            title={profile?.data?.title ?? ''}
            image={profileImage}
            follower={profile?.data?.followerCount ?? 0}
            following={profile?.data?.followingCount ?? 0}
          />
        </View>
        <View
          style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20, marginHorizontal: 14 }}
        >
          {selectedCategory.map((cur, idx) => (
            <InterestIcon
              key={idx}
              title={cur}
              textColor={iconColor[idx][0]}
              backgroundColor={iconColor[idx][1]}
            />
          ))}
        </View>
        <View style={{ marginHorizontal: 16 }}>
          <Text
            style={{ ...theme.fonts.text.body2.regular, color: `${theme.colors.graphic.black}cc` }}
          >
            {profile?.data?.introduction ?? ''}
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Pressable
            style={{
              ...styles.btn,
              backgroundColor: profile?.data?.follow ? '#e1e1d0' : theme.colors.graphic.black,
            }}
            onPress={() => {
              followMutation?.mutate();
            }}
          >
            {profile?.data?.follow ? (
              <Text
                style={{ ...theme.fonts.text.body1.bold, color: `${theme.colors.graphic.black}cc` }}
              >
                팔로잉
              </Text>
            ) : (
              <Text style={{ ...theme.fonts.text.body1.bold, color: theme.colors.graphic.white }}>
                팔로우
              </Text>
            )}
          </Pressable>
          {profile?.data?.challengeName ? (
            <BottomFixButton
              isActive={true}
              // text={`${profile?.data?.challengeName} 챌린지 중 `}
              text={`${profile?.data?.challengeName.slice(0, 9)}${
                (profile?.data?.challengeName.length ?? 11) > 10 ? '...' : ''
              } 챌린지 중`}
              width={343}
              height={48}
              chevron={true}
              onPress={() => alert(profile?.data?.challengeName)}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
            />
          ) : (
            <View style={{ marginBottom: 24 }}></View>
          )}
        </View>
      </View>
      <View style={styles.mid}>
        <View style={styles.title}>
          <Text style={{ ...theme.fonts.text.headline2, color: theme.colors.graphic.black }}>
            타이틀{' '}
          </Text>
          <Text style={{ ...theme.fonts.text.headline2, color: `${theme.colors.graphic.black}4d` }}>
            {titleTotal}
          </Text>
        </View>
        {representativeTitleList.map((cur, idx) => {
          return (
            <MypageTitle
              titleId={cur['titleId']}
              key={idx}
              label={cur['name']}
              condition={cur['introduction']}
              date={cur['achievedDate']
                .slice(0, cur['achievedDate'].indexOf('T'))
                .replace(/-/g, '.')}
            />
          );
        })}
      </View>
      {representativeTitleList.length > 3 ? (
        <Pressable
          onPress={() => alert('view every title!')}
          style={{ ...styles.viewAll, borderTopColor: `${theme.colors.graphic.black}1a` }}
        >
          <Text
            style={{ ...theme.fonts.text.body1.regular, color: `${theme.colors.graphic.black}cc` }}
          >
            전체보기
          </Text>
          <Feather name="chevron-right" size={24} color={`${theme.colors.graphic.black}cc`} />
        </Pressable>
      ) : null}
      <DividerBar style={styles.divider} />
      {userFolderList && (
        <>
          <ScrollView
            horizontal={true}
            contentContainerStyle={styles.group}
            showsHorizontalScrollIndicator={false}
          >
            {userFolderList.tabs.map((cur, idx) => {
              return (
                <FolderOption
                  key={idx}
                  title={cur.name}
                  selected={cur.isClicked}
                  onPress={() => handleFolderOption(cur.id)}
                />
              );
            })}
          </ScrollView>
          {feedList?.pages[0]?.length !== 0 ? (
            <>
              <View style={styles.insight}>
                <Text style={{ ...theme.fonts.text.headline2, color: theme.colors.graphic.black }}>
                  인사이트
                </Text>
              </View>

              <FeedList
                writer={{
                  writerId: Number(userId),
                  nickname: profile?.data?.nickname ?? '',
                  title: profile?.data?.title ?? '',
                  image: profileImage,
                }}
                feedList={feedList}
                feedListQueryClient={feedListQueryClient}
                fetchNextPage={fetchNextPage}
                touchBookMark={touchBookMark}
                feedListIsLoading={feedListIsLoading}
              />
            </>
          ) : (
            <View style={styles.noInsight}>
              <Text
                style={{
                  ...theme.fonts.text.body1.regular,
                  color: `${theme.colors.graphic.black}80`,
                }}
              >
                아직 인사이트가 없어요.
              </Text>
            </View>
          )}
        </>
      )}
    </IOScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  top: {
    backgroundColor: '#F1F1E9',
    paddingTop: 8,
  },
  btn: {
    marginTop: 32,
    marginBottom: 12,
    borderRadius: 12,
    width: 343,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mid: {
    marginHorizontal: 16,
  },
  title: {
    flexDirection: 'row',
    paddingTop: 24,
    paddingBottom: 22,
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  divider: {
    backgroundColor: '#f8f8f4',
    borderBottomColor: '#f8f8f4',
    height: 12,
    width: '150%',
    left: -50,
  },
  group: {
    marginLeft: 4,
    marginTop: 24,
    marginBottom: 10,
  },
  insight: {
    flexDirection: 'row',
    paddingTop: 24,
    paddingBottom: 10,
    marginLeft: 16,
  },
  button: {
    borderRadius: 12,
    backgroundColor: '#e0f6a2',
    marginBottom: 32,
  },
  buttonText: {
    color: '#486006',
  },
  noInsight: {
    marginTop: 74,
    marginBottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
