import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../../../theme/light';
import { STATISTIC } from './constant';
import StatisticIcon from './StatisticIcon';

interface ChallengeReactionProps {
  challengeId: number;
}

const ChallengeReaction = ({ challengeId }: ChallengeReactionProps) => {
  return (
    <View style={{ backgroundColor: theme.colors.brand.surface.container1, ...styles.container }}>
      <Text style={{ fontFamily: 'pretendard', fontSize: 14 }}>내 챌린지 통계</Text>
      <View style={styles.buttonList}>
        {STATISTIC.map((item, index) => (
          <StatisticIcon key={index} xml={item.xml} count={0} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    borderRadius: 12,
    paddingVertical: 17,
    paddingHorizontal: 20,
  },
  buttonList: {
    marginVertical: 12,
    marginHorizontal: 19,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default ChallengeReaction;
