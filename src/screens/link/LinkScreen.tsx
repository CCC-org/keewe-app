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
      navigation.reset(
        {
          index: 0,
          routes: [{ name: 'Tabs' }],
        },
        {
          index: 1,
          routes: [{ name: 'DetailedPost', params: { insightId: id } }],
        },
      );
    }
    if (type === 'profile') {
      if (userId === id) {
        navigation.reset(
          {
            index: 0,
            routes: [{ name: 'Tabs' }],
          },
          {
            index: 1,
            routes: [{ name: 'MyPage', params: { userId: id } }],
          },
        );
      } else {
        navigation.reset(
          {
            index: 0,
            routes: [{ name: 'Tabs' }],
          },
          {
            index: 1,
            routes: [{ name: 'Profile', params: { userId: id } }],
          },
        );
      }
    }
    if (type === 'challenge') {
      if (!isChallengeParticipationLoading) {
        if (participated && challengeParticipation?.challengeId === id) {
          navigation.reset(
            {
              index: 0,
              routes: [{ name: 'Tabs' }],
            },
            {
              index: 1,
              routes: [
                {
                  name: 'ChallengeDetail',
                  params: {
                    challengeId: challengeParticipation?.challengeId,
                    challengeName: challengeParticipation?.name,
                    interest: challengeParticipation?.interest,
                  },
                },
              ],
            },
          );
        } else {
          navigation.reset(
            {
              index: 0,
              routes: [{ name: 'Tabs' }],
            },
            {
              index: 1,
              routes: [
                {
                  name: 'ChallengeDetail',
                  params: { challengeId: id },
                },
              ],
            },
          );
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
