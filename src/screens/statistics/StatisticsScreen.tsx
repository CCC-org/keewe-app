import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ProfileAvatar from '../../components/profile/ProfileAvatar';
import ProfileImage from '../Main/mypage/ProfileImage';
import personXml from '../../constants/Icons/Avatar/personXml';
import { SvgXml } from 'react-native-svg';
import DividerBar from '../../components/bars/DividerBar';
import StatisticsProfile from './StatisticsProfile';
import StatisticsLinkInfo from './StatisticsLinkInfo';
import { useTheme } from 'react-native-paper';
import StatisticsReactionInfo from './StatisticsReactionInfo';

const StatisticsScreen = ({ route }) => {
  const {
    userId,
    nickname,
    date,
    content,
    insightTitle: linkTitle,
    insightContent: linkPreviewContent,
    insightId,
    viewCount,
    reactionCount,
    commentCount,
    bookmarkCount,
  } = route.params;
  console.log('route', route);
  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.main}>
        <StatisticsProfile name={nickname} />
        <View>
          <Text style={[theme.fonts.text.body2.regular]}>{content}</Text>
        </View>
        <DividerBar style={styles.divider} />
        <StatisticsLinkInfo title={linkTitle} content={linkPreviewContent} />
      </View>
      <StatisticsReactionInfo
        viewCount={viewCount}
        reactionCount={reactionCount}
        commentCount={commentCount}
        bookmarkCount={bookmarkCount}
      />
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
