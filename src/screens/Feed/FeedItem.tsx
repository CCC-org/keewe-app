import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { InsightData } from '../../types/Feed/Feedinsights';
import MiniProfile from '../../components/profile/MiniProfile';
import { useTheme } from 'react-native-paper';
import FeedLinkCard from './FeedLinkCard';
import { LinkPreview } from '@flyerhq/react-native-link-preview';
import FeedVerticalDots from './FeedVerticalDots';
import FeedTextContent from './FeedTextContent';

interface FeedItemProps {
  insight: InsightData;
}

const FeedItem = ({ insight }: FeedItemProps) => {
  const { id, contents, createdAt, link, reaction, writer } = insight;
  // splice contents string to 100 characters and add '...' at the end

  const handleOnBookMarkPress = () => {
    alert(`id:${id} bookmark pressed`);
  };

  const handleVerticalDotsPress = () => {
    alert(`id:${id} vertical dots pressed`);
  };

  const handleProfilePress = () => {
    alert(`writerId:${writer.writerId} profile pressed`);
  };

  const theme = useTheme();
  return (
    <View style={styles.Feed}>
      <View style={styles.Profilecontainer}>
        <Pressable onPress={handleProfilePress}>
          <MiniProfile
            style={styles.MiniProfile}
            nickname={writer.nickname}
            title={writer.title}
            image={'../../../assets/images/favicon.png'}
          />
        </Pressable>
        <FeedVerticalDots onPress={handleVerticalDotsPress} />
      </View>
      <View style={styles.contentCtn}>
        <FeedTextContent contents={contents} insightId={id} />
        <FeedLinkCard text={'naver.com'} onBookmarkPress={handleOnBookMarkPress} />
      </View>
    </View>
  );
};

export default FeedItem;

const styles = StyleSheet.create({
  Feed: {
    marginBottom: 28,
  },

  Profilecontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  MiniProfile: {},
  contentCtn: {
    backgroundColor: '#f1f1e9',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    paddingTop: 16,
    paddingRight: 20,
    paddingLeft: 20,
    minHeight: 120,
  },
});
