import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ChallengeAPI } from '../../utils/api/ChallengeAPI';
import { useQuery } from '@tanstack/react-query';
import ChallengeProfile from './challenge/ChallengeProfile';

const ChallengesScreen = () => {
  const { data: check, isLoading: isCheckLoading } = useQuery([], ChallengeAPI.participationCheck);

  const { data: currentChallenge, isLoading: isCurrentChallengeLoading } = useQuery(
    [],
    ChallengeAPI.getChallenge,
    { enabled: check !== undefined },
  );

  return (
    <View>
      {check ? (
        <View>
          <Text> 참여중인 챌린지 </Text>
          <Image source={require('../../../assets/images/challenge/challengeEmpty.png')} />
          <ChallengeProfile
            name={currentChallenge?.name ?? ''}
            participatingUserNumber={currentChallenge?.participatingUserNumber ?? 0}
            interest={currentChallenge?.interest ?? ''}
            startDate={currentChallenge?.startDate ?? ''}
            highlight={true}
          />
        </View>
      ) : (
        <Image source={require('../../../assets/images/challenge/challengeEmpty.png')} />
      )}
      <Text>ChallengesScreen</Text>
    </View>
  );
};

export default ChallengesScreen;

const styles = StyleSheet.create({});
