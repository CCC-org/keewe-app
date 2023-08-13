import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import DividerBar from '../../components/bars/DividerBar';
import StatisticsProfile from './StatisticsProfile';
import StatisticsLinkInfo from './StatisticsLinkInfo';
import { useTheme } from 'react-native-paper';
import StatisticsReactionInfo from './StatisticsReactionInfo';
import { useQuery } from '@tanstack/react-query';
import { StatisticsAPI, StatisticsQueryKeys } from '../../utils/api/StatisticsAPI';
import FollowCountCard from './FollowCountCard';
import { InsightAPI, InsightQueryKeys } from '../../utils/api/InsightAPI';

const StatisticsScreen = ({ route }) => {
  const {
    content,
    insightTitle: linkTitle,
    insightContent: linkPreviewContent,
    insightId,
  } = route.params;
  const theme = useTheme();

  const { data: count, isLoading: isCountLoading } = useQuery(
    StatisticsQueryKeys.getStatistics({ insightId }),
    () => StatisticsAPI.getStatistics({ insightId }),
  );

  const { data: followCount, isLoading: isFollowCountLoading } = useQuery(
    InsightQueryKeys.getInsightFollow({ insightId }),
    () => InsightAPI.getInsightFollow({ insightId }),
  );

  const { data: visitCount, isLoading: isVisitCountLoading } = useQuery(
    InsightQueryKeys.getInsightVisit({ insightId }),
    () => InsightAPI.getInsightVisit({ insightId }),
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.main}>
          <StatisticsProfile insightId={insightId} />
          <View>
            <Text numberOfLines={2} style={[theme.fonts.text.body2.regular]}>
              {content}
            </Text>
          </View>
          <DividerBar style={styles.divider} />
          <StatisticsLinkInfo title={linkTitle} content={linkPreviewContent} />
        </View>
        {!isCountLoading && (
          <StatisticsReactionInfo
            viewCount={count?.data?.viewCount ?? 0}
            reactionCount={count?.data?.reactionCount ?? 0}
            commentCount={count?.data?.commentCount ?? 0}
            bookmarkCount={count?.data?.bookmarkCount ?? 0}
          />
        )}
      </View>
      <Text
        style={{
          ...theme.fonts.text.headline2,
          marginVertical: 24,
          marginHorizontal: 16,
        }}
      >
        이 인사이트를 보고
      </Text>
      <View style={styles.followContainer}>
        <FollowCountCard count={followCount?.data?.count ?? 0} title={'나를 팔로우 한 사람'} />
        <FollowCountCard count={visitCount?.data?.count ?? 0} title={'내 프로필을 방문한 사람'} />
      </View>
    </SafeAreaView>
  );
};

export default StatisticsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#12131410',
  },
  main: {
    flexDirection: 'column',
    borderWidth: 1,
    padding: 16,
    borderRadius: 12,
    borderColor: '#12131420',
    backgroundColor: '#f8f8f4',
  },
  divider: {
    marginTop: 16,
    marginBottom: 12,
  },
  profileInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  followContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 16,
  },
});
