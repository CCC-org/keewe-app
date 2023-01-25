import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
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
import MyPageFeedList from './MyPageFeedList';
//import RNFadedScrollView from 'rn-faded-scrollview';

const MyPageScreen = ({ navigation, route }) => {
  const { userId } = route.params;
  if (userId === null || userId === undefined) {
    alert('userId를 인식할 수 없었습니다.');
    return null;
  }
  const theme = useTheme();
  const [profileImage, setProfileImage] = useState<string>('');
  const [nickname, setNickname] = useState<string>('닉네임');
  const [title, setTitle] = useState<string>('대표 타이틀');
  const [follower, setFollower] = useState<number>(0);
  const [following, setFollowing] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [introduction, setIntroduction] = useState<string>('소개글');
  const [representativeTitleList, setRepresentativeTitleList] = useState<AchievedTitle[]>([]);
  const [titleTotal, setTitleTotal] = useState<number>(0);
  const [folderList, setFolderList] = useState<FolderData[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<boolean[]>([]);
  const [iconColor, setIconColor] = useState([
    [theme.colors.graphic.purple, `${theme.colors.graphic.purple}1a`],
    [theme.colors.graphic.sky, `${theme.colors.graphic.sky}1a`],
    [theme.colors.graphic.hotpink, `${theme.colors.graphic.hotpink}1a`],
    [theme.colors.graphic.violet, `${theme.colors.graphic.violet}1a`],
    [theme.colors.graphic.green, `${theme.colors.graphic.green}1a`],
  ]);

  const { data: profile, isLoading: isProfileLoading } = useQuery(
    MypageQueryKeys.getProfile({ targetId: userId }),
    () => MypageAPI.getProfile({ targetId: userId }),
    querySuccessError,
  );
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

  // const forderMutation = useMutation({
  //   mutationFn: (tabId: number) => {
  //   }
  // })

  useEffect(() => {
    setTitle(profile?.data?.title ?? '');
    setSelectedCategory(profile?.data?.interests ?? []);
    setProfileImage(profile?.data?.image);
    setIntroduction(profile?.data?.introduction ?? '');
    setFollower(profile?.data?.followerCount ?? 0);
    setFollowing(profile?.data?.followingCount ?? 0);
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

  return (
    <ScrollView>
      <View style={styles.top}>
        <View style={styles.setting}>
          <Pressable onPress={() => alert('setting')}>
            <Ionicons name="settings-outline" size={24} color={`${theme.colors.graphic.black}cc`} />
          </Pressable>
          <Pressable onPress={() => alert('more')}>
            <Feather name="more-vertical" size={24} color={`${theme.colors.graphic.black}cc`} />
          </Pressable>
        </View>
        <View style={{ marginLeft: 16, marginBottom: 24 }}>
          <MypageProfile
            nickname={profile?.data?.nickname ?? ''}
            title={title}
            image={profileImage}
            follower={follower}
            following={following}
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
            {introduction}
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Pressable
            style={styles.editBtn}
            onPress={() =>
              navigation.navigate('ProfileEdit', {
                nickname: profile?.data?.nickname ?? '',
                title,
                selectedCategory,
                introduction,
                userId,
              })
            }
          >
            <Text
              style={{ ...theme.fonts.text.body1.bold, color: `${theme.colors.graphic.black}cc` }}
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
          <Text style={{ ...theme.fonts.text.headline2, color: `${theme.colors.graphic.black}4d` }}>
            {titleTotal}
          </Text>
        </View>
        {representativeTitleList.map((cur, idx) => {
          return (
            <MypageTitle
              key={idx}
              label={cur['name']}
              condition={cur['introduction']}
              date={cur['achievedDate']}
            />
          );
        })}
      </View>
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
          <MyPageFeedList id={userFolderList.selectedTab.id} userId={userId} />
        </>
      )}

      <View style={styles.insight}>
        <Text style={{ ...theme.fonts.text.headline2, color: theme.colors.graphic.black }}>
          인사이트{' '}
        </Text>
        <Text style={{ ...theme.fonts.text.headline2, color: `${theme.colors.graphic.black}4d` }}>
          581
        </Text>
      </View>
    </ScrollView>
  );
};

export default MyPageScreen;

const styles = StyleSheet.create({
  top: {
    backgroundColor: '#F1F1E9',
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 14,
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
    paddingBottom: 10,
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
});
