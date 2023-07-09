import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import FolderOption from './FolderOption';
import FeedList from '../../Feed/FeedList';
import { useTheme } from 'react-native-paper';
import { InfiniteData, QueryClient, UseMutateFunction } from '@tanstack/react-query';
import MainLottie from '../../../components/lotties/MainLottie';

interface ProfilePageFolderSectionProps {
  userFolderList: any;
  handleFolderOption: (tabId: number) => void;
  feedList: InfiniteData<InsightData[] | undefined> | undefined;
  feedListQueryClient: QueryClient;
  fetchNextPage: () => void;
  touchBookMark: UseMutateFunction<any, unknown, number, void>;
  feedListIsLoading: any;
  userId: number | string;
  profile: ProfileGetResponse | undefined;
}

const ProfilePageFolderSection = ({
  userFolderList,
  handleFolderOption,
  feedList,
  feedListQueryClient,
  fetchNextPage,
  touchBookMark,
  feedListIsLoading,
  userId,
  profile,
}: ProfilePageFolderSectionProps) => {
  const theme = useTheme();

  const hasInsights = feedList?.pages[0]?.length !== 0;

  return (
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
      {feedListIsLoading && (
        <View
          style={{
            width: '100%',
            height: 400,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        ></View>
      )}
      {hasInsights && !feedListIsLoading ? (
        <View>
          <View style={[styles.insight]}>
            <Text style={{ ...theme.fonts.text.headline2, color: theme.colors.graphic.black }}>
              인사이트
            </Text>
          </View>
          <FeedList
            writer={{
              writerId: Number(userId),
              nickname: profile?.data?.nickname ?? '',
              title: profile?.data?.title ?? '',
              image: profile?.data?.image ?? '',
            }}
            feedList={feedList}
            feedListQueryClient={feedListQueryClient}
            fetchNextPage={fetchNextPage}
            touchBookMark={touchBookMark}
            feedListIsLoading={feedListIsLoading}
            scrollStyle={{ marginBottom: 400 }}
          />
        </View>
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
  );
};

export default ProfilePageFolderSection;

const styles = StyleSheet.create({
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
    marginBottom: 600,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
