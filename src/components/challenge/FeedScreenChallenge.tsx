import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { UserSpecificChallenge } from '../../types/Feed/UserSpecificChallenge';
import {
  UserSpecificChallengeAPI,
  UserSpecificChallengeQueryKeys,
} from '../../utils/api/UserSpecificChallenge';
import UserSpecificChallengeSection from '../../screens/Feed/UserSpecificChallengeSection';

const FeedScreenChallenge = () => {
  const { data: userSpecificChallenge, ...challengeData } = useQuery<
    UserSpecificChallenge['data'] | undefined
  >(UserSpecificChallengeQueryKeys.getUserSpecificChallenge(), () =>
    UserSpecificChallengeAPI.getUserSpecificChallenge(),
  );

  return (
    <View>
      {userSpecificChallenge && (
        <UserSpecificChallengeSection userSpecificChallenge={userSpecificChallenge} />
      )}
      <Text>FeedScreen Challenge. </Text>
    </View>
  );
};

export default FeedScreenChallenge;

const styles = StyleSheet.create({});
