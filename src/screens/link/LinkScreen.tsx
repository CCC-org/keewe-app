import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
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
  const { data: challengeParticipation, isLoading: isChallengeParticipationLoading } = useQuery(
    ChallengeQueryKeys.getChallengeParticipation(),
    ChallengeAPI.getChallengeParticipation,
    { enabled: participated },
  );

  useEffect(() => {
    if (type === 'challenge') {
      // navigation.pop();
      navigation.navigate('DetailedPost', {
        screen: 'DetailedPost',
        insightId: id,
      });
    }
    if (type === 'profile') {
      if (userId === id) {
        // navigation.pop();
        navigation.navigate('MyPage', {
          screen: 'MyPage',
          userId: id,
        });
      } else {
        // navigation.pop();
        navigation.navigate('Profile', {
          screen: 'Profile',
          userId: id,
        });
      }
    }
    if (type === 'challenge') {
      if (!isChallengeParticipationLoading) {
        if (participated && challengeParticipation?.challengeId === id) {
          // navigation.pop();
          navigation.navigate('ChallengeDetail', {
            screen: 'ChallengeDetail',
            challengeId: challengeParticipation?.challengeId,
            challengeName: challengeParticipation?.name,
            interest: challengeParticipation?.interest,
          });
        } else {
          // navigation.pop();
          navigation.navigate('ChallengeParticipation', {
            screen: 'ChallengeParticipation',
            challengeId: id,
          });
        }
      }
    }
  }, [type, id, isChallengeParticipationLoading]);
  return (
    <>
      <MainLottie />
    </>
  );
};

export default LinkScreen;
