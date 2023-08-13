import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import MiniProfile from '../../components/profile/MiniProfile';
import FeedLinkWithBookMark from './FeedLinkCard';
import FeedVerticalDots from './FeedVerticalDots';
import FeedTextContent from './FeedTextContent';
import { REACTIONS } from './constant';
import ReactIconButton from '../../components/emoticons/ReactIconButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
interface FeedItemProps {
  insight: InsightData;
  localId?: string;
  onBookMarkClick: (id: number) => void;
}

const FeedItem = ({ insight, localId, onBookMarkClick }: FeedItemProps) => {
  const { id, contents, createdAt, link, reaction, writer, bookmark } = insight;
  const navigation = useNavigation<StackNavigationProp<any>>();
  const handleOnBookMarkPress = () => {
    onBookMarkClick(id);
  };

  const handleProfilePress = () => {
    if (localId === null || localId === undefined) {
      alert('잠시 후 다시 시도하세요.');
      return;
    }
    if (localId === String(writer?.writerId))
      navigation.push('MyProfile', { userId: localId, enteredByTab: false });
    else navigation.push('Profile', { userId: writer?.writerId ?? 0 });
  };
  return (
    <View style={styles.Feed}>
      <View style={styles.Profilecontainer}>
        <Pressable onPress={handleProfilePress}>
          <MiniProfile
            style={styles.MiniProfile}
            nickname={writer?.nickname}
            title={writer?.title}
            image={writer?.image}
            createdAt={createdAt}
          />
        </Pressable>
        <FeedVerticalDots
          userName={writer?.nickname}
          userId={writer?.writerId}
          insightId={id}
          nickname={writer?.nickname}
          title={writer?.title}
          image={writer?.image}
          contents={contents}
          link={link.url}
        />
      </View>
      <View style={styles.contentCtn}>
        <FeedTextContent contents={contents} insightId={id} bookmark={bookmark} />
        <View style={{ marginVertical: 4 }}>
          <FeedLinkWithBookMark
            text={insight.link.url}
            onBookmarkPress={handleOnBookMarkPress}
            isBookMarked={bookmark}
          />
        </View>
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
    paddingVertical: 16,
    borderRadius: 8,
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
