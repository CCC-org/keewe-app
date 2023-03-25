import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { UserSpecificChallenge } from '../../types/Feed/UserSpecificChallenge';
import {
  UserSpecificChallengeAPI,
  UserSpecificChallengeQueryKeys,
} from '../../utils/api/UserSpecificChallenge';
import UserSpecificChallengeSection from '../../screens/Feed/UserSpecificChallengeSection';
import DividerBar from '../bars/DividerBar';

const FeedScreenChallenge = () => {
  const { data: userSpecificChallenge } = useQuery<UserSpecificChallenge['data'] | undefined>(
    UserSpecificChallengeQueryKeys.getUserSpecificChallenge(),
    () => UserSpecificChallengeAPI.getUserSpecificChallenge(),
  );
  console.log(
    '🚀 ~ file: FeedScreenChallenge.tsx:17 ~ FeedScreenChallenge ~ userSpecificChallenge:',
    userSpecificChallenge,
  );

  if (!userSpecificChallenge) return null;

  return (
    <>
      <View>
        {userSpecificChallenge && (
          <UserSpecificChallengeSection userSpecificChallenge={userSpecificChallenge} />
        )}
      </View>
      <DividerBar style={styles.divider} />
    </>
  );
};

export default FeedScreenChallenge;

const styles = StyleSheet.create({
  divider: {
    backgroundColor: '#f8f8f4',
    borderBottomColor: '#f8f8f4',
    marginBottom: 24,
    height: 12,
    width: '150%',
    marginLeft: 0,
    left: -50,
  },
});
