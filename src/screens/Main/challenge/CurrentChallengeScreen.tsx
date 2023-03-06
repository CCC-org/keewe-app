import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ScrollView } from 'react-native';
import { ChallengeAPI } from '../../../utils/api/ChallengeAPI';
import CurrentChallengeProfile from '../../../components/profile/ChallengeProfileCurrent';

const CurrentChallengeScreen = () => {
  const { data: challengeCurrent, isLoading: isChallengeCurrentLoading } = useQuery(
    ['challenge', { size: 5 }],
    () => ChallengeAPI.getChallengeCurrent({ size: 5 }),
  );
  return (
    <ScrollView>
      {!isChallengeCurrentLoading &&
        challengeCurrent?.map((current, index) => (
          <CurrentChallengeProfile
            key={index}
            name={current.challengeName}
            interest={current.challengeCategory}
            challengeDescription={current.challengeIntroduction}
            insightNumber={current.insightCount}
          />
        ))}
    </ScrollView>
  );
};

export default CurrentChallengeScreen;
