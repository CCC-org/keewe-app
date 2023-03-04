import React from 'react';
import { View, StyleSheet } from 'react-native';
import ChallengeTitle from '../../../components/header/ChallengeTitle';

const ChallengeDetailScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <ChallengeTitle
        title={'ss'}
        category={'사진'}
        startDate={'2023.01.01'}
        challengeIntroduction={'첼린지 상세'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
});

export default ChallengeDetailScreen;
