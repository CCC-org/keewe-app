import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../../../theme/light';
import { ChallengeAPI, ChallengeQueryKeys } from '../../../utils/api/ChallengeAPI';
import { STATISTIC } from './constant';
import StatisticIcon from './StatisticIcon';

interface ChallengeReactionProps {
  challengeId: number;
}

const ChallengeReaction = ({ challengeId }: ChallengeReactionProps) => {
  const { data: statisticResponse, isLoading } = useQuery(
    ChallengeQueryKeys.getChallengeStatistics(),
    () => ChallengeAPI.getChallengeStatistics(),
  );

  return (
    <>
      {!isLoading && statisticResponse && (
        <View
          style={{ backgroundColor: theme.colors.brand.surface.container1, ...styles.container }}
        >
          <Text style={{ fontFamily: 'pretendard', fontSize: 14 }}>내 챌린지 통계</Text>
          <View style={styles.buttonList}>
            {STATISTIC.map((item, index) => (
              <StatisticIcon key={index} xml={item.xml} count={statisticResponse[item.name]} />
            ))}
          </View>
        </View>
      )}
    </>
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
    marginTop: 16,
    marginBottom: 12,
    marginHorizontal: 40,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default ChallengeReaction;
