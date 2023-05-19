import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import DividerBar from '../../components/bars/DividerBar';
import StatisticsProfile from './StatisticsProfile';
import StatisticsLinkInfo from './StatisticsLinkInfo';
import { useTheme } from 'react-native-paper';
import StatisticsReactionInfo from './StatisticsReactionInfo';
import { useQuery } from '@tanstack/react-query';
import { StatisticsAPI, StatisticsQueryKeys } from '../../utils/api/StatisticsAPI';

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.main}>
        <StatisticsProfile insightId={insightId} />
        <View>
          <Text style={[theme.fonts.text.body2.regular]}>{content}</Text>
        </View>
        <DividerBar style={styles.divider} />
        <StatisticsLinkInfo title={linkTitle} content={linkPreviewContent} />
      </View>
      {!isCountLoading && (
        <StatisticsReactionInfo
          viewCount={count?.data?.viewCount ?? 0}
          reactionCount={count?.data?.reactCount ?? 0}
          commentCount={count?.data?.commentCount ?? 0}
          bookmarkCount={count?.data?.bookmarkCount ?? 0}
        />
      )}
    </ScrollView>
  );
};

export default StatisticsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
});
