import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { InsightData } from '../../types/Feed/Feedinsights';
import MiniProfile from '../../components/profile/MiniProfile';
import FeedLinkWithBookMark from './FeedLinkCard';
import FeedVerticalDots from './FeedVerticalDots';
import FeedTextContent from './FeedTextContent';
import { REACTIONS } from './constant';
import ReactIconButton from '../../components/emoticons/ReactIconButton';
import { useNavigation } from '@react-navigation/native';

interface FeedItemProps {
  insight: InsightData;
  onBookMarkClick: (id: number) => void;
}

const FeedItem = ({ insight, onBookMarkClick }: FeedItemProps) => {
  const { id, contents, createdAt, link, reaction, writer, bookmark } = insight;
  const navigation = useNavigation();
  const handleOnBookMarkPress = () => {
    onBookMarkClick(id);
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile', { userId: writer.writerId });
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
        <FeedVerticalDots userId={writer.writerId} />
      </View>
      <View style={styles.contentCtn}>
        <FeedTextContent contents={contents} insightId={id} />
        <FeedLinkWithBookMark
          text={insight.link.url}
          onBookmarkPress={handleOnBookMarkPress}
          isBookMarked={bookmark}
        />
        <View style={{ ...styles.ReactionBar }}>
          {REACTIONS.map((react) => (
            <ReactIconButton
              key={react.reaction}
              xml={react.xml}
              color={react.color}
              taps={reaction[react.reaction]}
              name={react.name}
              insightId={id}
            />
          ))}
        </View>
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
  ReactionBar: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    alignItems: 'center',
  },
});
