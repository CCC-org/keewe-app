import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { InsightData } from '../../types/Feed/Feedinsights';
import MiniProfile from '../../components/profile/MiniProfile';
import { useTheme } from 'react-native-paper';
import FeedLinkCard from './FeedLinkCard';
import { LinkPreview } from '@flyerhq/react-native-link-preview';

interface FeedItemProps {
  insight: InsightData;
}

const FeedItem = ({ insight }: FeedItemProps) => {
  const { contents, createdAt, link, reaction, writer } = insight;
  // splice contents string to 100 characters and add '...' at the end

  const modifiedContents = contents.length > 100 ? contents.slice(0, 100) + '...' : contents;

  const theme = useTheme();
  return (
    <View style={styles.Feed}>
      <MiniProfile
        style={styles.MiniProfile}
        nickname={writer.nickname}
        title={writer.title}
        image={'../../../assets/images/favicon.png'}
      />
      <View style={styles.contentCtn}>
        <Text style={theme.fonts.text.body1.regular}>
          {modifiedContents}
          {modifiedContents.length >= 99 ? (
            <Text style={[theme.fonts.text.body1.regular, { color: '#12131450' }]}>더보기</Text>
          ) : null}
        </Text>
        <FeedLinkCard text={'naver.com'} />
      </View>
    </View>
  );
};

export default FeedItem;

const styles = StyleSheet.create({
  Feed: {
    marginBottom: 24,
  },
  MiniProfile: {
    marginBottom: 16,
  },
  contentCtn: {
    backgroundColor: '#f1f1e9',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    paddingTop: 16,
    paddingRight: 20,
    paddingLeft: 20,
  },
});
