import { StyleSheet, View } from 'react-native';
import React from 'react';
import reaction from '../../../assets/svgs/StatisticIcon/reaction';
import view from '../../../assets/svgs/StatisticIcon/view';
import comment from '../../../assets/svgs/StatisticIcon/comment';
import bookmark from '../../../assets/svgs/StatisticIcon/bookmark';
import StatisticsReactionCountInfo from './StatisticsReactionCountInfo';

interface Props {
  viewCount: number;
  reactionCount: number;
  commentCount: number;
  bookmarkCount: number;
}

const StatisticsReactionInfo = ({
  viewCount,
  bookmarkCount,
  commentCount,
  reactionCount,
}: Props) => {
  return (
    <View style={styles.reactionContainer}>
      <StatisticsReactionCountInfo xml={view} count={viewCount} />
      <StatisticsReactionCountInfo xml={reaction} count={reactionCount} />
      <StatisticsReactionCountInfo xml={comment} count={commentCount} />
      <StatisticsReactionCountInfo xml={bookmark} count={bookmarkCount} />
    </View>
  );
};

export default StatisticsReactionInfo;

const styles = StyleSheet.create({
  reactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 34,
    marginBottom: 12,
    marginHorizontal: 32,
  },
});
