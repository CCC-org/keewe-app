import { Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MypageProfile from '../../../components/profile/MypageProfile';
import { useTheme } from 'react-native-paper';
import MypageTitle from '../../../components/title/MypageTitle';
import DividerBar from '../../../components/bars/DividerBar';
import InterestIcon from './InterestIcon';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { MypageAPI, MypageQueryKeys } from '../../../utils/api/mypageAPI';
import { useInfiniteFeed } from '../../../utils/hooks/feedInifiniteScroll/useInfiniteFeed';
import GoToUploadButton from '../../../components/buttons/GoToUploadButton';
import { IOScrollView } from 'react-native-intersection-observer';
import { useScrollToTop } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import MainLottie from '../../../components/lotties/MainLottie';
import { notificationKeys } from '../../../utils/api/notification/notification';
import ProfilePageFolderSection from './ProfilePageFolderSection';

const MyPageScreen = ({ navigation, route }) => {
  const { userId } = route.params;
  const queryClient = useQueryClient();

  if (userId === null || userId === undefined) {
    alert('userId를 인식할 수 없었습니다.');
    return null;
  }

  const theme = useTheme();

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

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: MypageQueryKeys.getProfile({ targetId: userId }),
    queryFn: () => MypageAPI.getProfile({ targetId: userId }),
  });

  const { data: representativeTitles, isLoading: isrepresentativeTitlesLoading } = useQuery(
    MypageQueryKeys.getRepresentativeTitles({ userId: userId }),
    () => MypageAPI.getRepresentativeTitles({ userId: userId }),
  );

  const { data: userFolderList, isLoading: isUserFolderListLoading } = useQuery(
    MypageQueryKeys.getFolderList({ userId: userId }),
    () => MypageAPI.getModifiedFolderList({ userId: userId }),
  );

  const drawerId =
    isUserFolderListLoading === true || userFolderList?.selectedTab?.id === 0
      ? ''
      : String(userFolderList?.selectedTab?.id);

  const { feedList, feedListIsLoading, touchBookMark, fetchNextPage, feedListQueryClient } =
    useInfiniteFeed(
      'https://api-keewe.com/api/v1/insight/my-page/' + userId + '?drawerId=' + drawerId,
    );

  const scrollViewRef = useRef<any>(null);
  useScrollToTop(scrollViewRef);
  const [pageRefreshing, setPageRefreshing] = useState(false);
  const onRefresh = () => {
    setPageRefreshing(true);
    queryClient.invalidateQueries(notificationKeys.checkNotification());
    feedListQueryClient.invalidateQueries(['mypage']).then(() => setPageRefreshing(false));
  };

  useEffect(() => {
    setSelectedCategory(profile?.data?.interests ?? []);
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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      feedListQueryClient.invalidateQueries(['mypage']);
      queryClient.invalidateQueries(notificationKeys.checkNotification());
    });
    return unsubscribe;
  }, [navigation]);

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

  if (
    isProfileLoading ||
    isrepresentativeTitlesLoading ||
    isUserFolderListLoading ||
    !userFolderList?.tabs
  ) {
    return <MainLottie />;
  }

  return (
    <>
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
              image={profile?.data?.image ?? ''}
              follower={profile?.data?.followerCount ?? 0}
              following={profile?.data?.followingCount ?? 0}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginBottom: 20,
              marginHorizontal: 14,
            }}
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
              style={{
                ...theme.fonts.text.body2.regular,
                color: `${theme.colors.graphic.black}cc`,
              }}
            >
              {profile?.data?.introduction ?? ''}
            </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Pressable
              style={styles.editBtn}
              onPress={() =>
                navigation.navigate('ProfileEdit', {
                  image: profile?.data?.image ?? '',
                  nickname: profile?.data?.nickname ?? '',
                  title: profile?.data?.title ?? '',
                  selectedCategory,
                  introduction: profile?.data?.introduction ?? '',
                  userId,
                })
              }
            >
              <Text
                style={{
                  ...theme.fonts.text.body1.bold,
                  color: `${theme.colors.graphic.black}cc`,
                }}
              >
                프로필 수정
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.mid}>
          <View style={styles.title}>
            <Text style={{ ...theme.fonts.text.headline2, color: theme.colors.graphic.black }}>
              타이틀{' '}
            </Text>
            <Text
              style={{ ...theme.fonts.text.headline2, color: `${theme.colors.graphic.black}4d` }}
            >
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
        {titleTotal > 3 ? (
          <Pressable
            onPress={() => navigation.navigate('Title', { userId })}
            style={{ ...styles.viewAll, borderTopColor: `${theme.colors.graphic.black}1a` }}
          >
            <Text
              style={{
                ...theme.fonts.text.body1.regular,
                color: `${theme.colors.graphic.black}cc`,
              }}
            >
              전체보기
            </Text>
            <Feather name="chevron-right" size={24} color={`${theme.colors.graphic.black}cc`} />
          </Pressable>
        ) : null}
        <DividerBar style={styles.divider} />
        <ProfilePageFolderSection
          feedList={feedList}
          userFolderList={userFolderList}
          feedListQueryClient={feedListQueryClient}
          fetchNextPage={fetchNextPage}
          profile={profile}
          touchBookMark={touchBookMark}
          userId={userId}
          handleFolderOption={handleFolderOption}
          feedListIsLoading={feedListIsLoading}
        />
      </IOScrollView>
      <GoToUploadButton />
    </>
  );
};

export default MyPageScreen;

const styles = StyleSheet.create({
  top: {
    backgroundColor: '#F1F1E9',
    paddingTop: 14,
  },
  editBtn: {
    backgroundColor: '#e1e1d0',
    marginVertical: 32,
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
  noInsight: {
    marginTop: 74,
    marginBottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
