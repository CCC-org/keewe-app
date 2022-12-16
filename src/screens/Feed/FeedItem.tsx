import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { InsightData } from '../../types/Feed/Feedinsights';
import MiniProfile from '../../components/profile/MiniProfile';
import FeedLinkWithBookMark from './FeedLinkCard';
import FeedVerticalDots from './FeedVerticalDots';
import FeedTextContent from './FeedTextContent';

interface FeedItemProps {
  insight: InsightData;
  onBookMarkClick: (id: number) => void;
  bookMarkIsLoading: boolean;
}

const FeedItem = ({ insight, onBookMarkClick, bookMarkIsLoading }: FeedItemProps) => {
  const { id, contents, createdAt, link, reaction, writer, bookmark } = insight;

  const handleOnBookMarkPress = () => {
    onBookMarkClick(id);
  };

  const handleVerticalDotsPress = () => {
    alert(`id:${id} vertical dots pressed`);
  };

  const handleProfilePress = () => {
    alert(`writerId:${writer.writerId} profile pressed`);
  };

  return (
    <View style={styles.Feed}>
      <View style={styles.Profilecontainer}>
        <Pressable onPress={handleProfilePress}>
          <MiniProfile
            style={styles.MiniProfile}
            nickname={writer.nickname}
            title={writer.title}
            createdAt={createdAt}
          />
        </Pressable>
        <FeedVerticalDots onPress={handleVerticalDotsPress} />
      </View>
      <View style={styles.contentCtn}>
        <FeedTextContent contents={contents} insightId={id} />
        <FeedLinkWithBookMark
          bookMarkIsLoading={bookMarkIsLoading}
          text={insight.link.url}
          onBookmarkPress={handleOnBookMarkPress}
          isBookMarked={bookmark}
        />
        {/* TODO: 인사이트 반응 남기기 */}
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
    borderWidth: 1,
    justifyContent: 'space-between',
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
