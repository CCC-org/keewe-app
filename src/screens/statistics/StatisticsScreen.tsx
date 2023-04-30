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
    insightTitle,
    insightContent,
    viewCount,
    reactionCount,
    commentCount,
    bookmarkCount,
  } = route;

  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.main}>
        <StatisticsProfile name="meanjeong" />
        <View>
          <Text style={[theme.fonts.text.body2.regular]}>
            대통령은 조국의 평화적 통일을 위한 성실한 의무를 진다. 공무원의 신분과 정치적 중립성은
            법률이 정하는 바에 의하여 보장된다. 농업생산성의 제고와 농지의 합리적인 이용을 위하거나
            불가피한 사정으로 발생하는 농지의 임대차와 위탁경영은 법률이 정하는 바에 의하여
            인정된다. 대통령은 법률에서 구체적으로 범위를 정하여 위임받은 사항과 법률을 집행하기
            위하여 필요한 사항에 관하여 대통령령을 발할 수 있다. 국무회의는 정부의 권한에 속하는
            중요한 정책을 심의한다.
          </Text>
        </View>
        <DividerBar style={styles.divider} />
        <StatisticsLinkInfo />
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
