import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import MainLottie from '../../components/lotties/MainLottie';
import { ChallengeAPI, ChallengeQueryKeys } from '../../utils/api/ChallengeAPI';
import { useGetUserId } from '../../utils/hooks/useGetUserId';

const LinkScreen = ({ navigation, route }) => {
  const { type, id } = route.params;
  const [participated, setParticipated] = useState<boolean>(false);
  const userId = useGetUserId();

  useQuery(ChallengeQueryKeys.getParticipationCheck(), () => ChallengeAPI.getParticipationCheck(), {
    onSuccess: () => setParticipated(true),
  });

  if (type === 'insight') {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Tabs' }],
    });
    navigation.push('DetailedPost', {
      screen: 'DetailedPost',
      insightId: id,
    });
  }
  if (type === 'profile') {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Tabs' }],
    });
    if (userId === id) {
      navigation.push('MyPage', {
        screen: 'MyPage',
        userId: id,
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Tabs' }],
      });
      navigation.push('Profile', {
        screen: 'Profile',
        userId: id,
      });
    }
  }
  if (type === 'challenge') {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Tabs' }],
    });
    const { data: challengeParticipation, isLoading: isChallengeParticipationLoading } = useQuery(
      ChallengeQueryKeys.getChallengeParticipation(),
      ChallengeAPI.getChallengeParticipation,
      {
        onSuccess: (response) => {
          if (response.challengeId === id) {
            navigation.push('ChallengeDetail', {
              screen: 'ChallengeDetail',
              challengeId: challengeParticipation?.challengeId,
              challengeName: challengeParticipation?.name,
              interest: challengeParticipation?.interest,
            });
          } else {
            navigation.push('ChallengeParticipation', {
              screen: 'ChallengeParticipation',
              challengeId: id,
            });
          }
        },
        enabled: participated,
      },
    );
  }

  return (
    <>
      <MainLottie />
    </>
  );
};

export default LinkScreen;
