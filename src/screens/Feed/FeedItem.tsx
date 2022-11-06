import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { InsightData } from '../../types/Feed/Feedinsights';
import MiniProfile from '../../components/profile/MiniProfile';
import { useTheme } from 'react-native-paper';

interface FeedItemProps {
  insight: InsightData;
}

const FeedItem = ({ insight }: FeedItemProps) => {
  const { contents, createdAt, link, reaction, writer } = insight;
  const theme = useTheme();
  return (
    <View style={styles.Feed}>
      <MiniProfile
        nickname={writer.nickname}
        title={writer.title}
        image={'../../../assets/images/favicon.png'}
      />
      <View style={styles.contentCtn}>
        <Text style={theme.fonts.text.body1.regular}>{contents}</Text>
      </View>
    </View>
  );
};

export default FeedItem;

const styles = StyleSheet.create({
  Feed: {
    borderWidth: 1,
  },
  contentCtn: {
    backgroundColor: '#f1f1e9',
  },
});
