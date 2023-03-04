import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ScrollView } from 'react-native';
import { ChallengeAPI } from '../../../utils/api/ChallengeAPI';
import ChallengeProfile from '../../../components/profile/ChallengeProfile';

const HistoryChallengeScreen = () => {
  const { data: challengeHistory, isLoading: isChallengeHIstoryLoading } = useQuery(
    ['challenge'],
    () => ChallengeAPI.getChallengeHistory(),
  );
  return (
    <ScrollView>
      {!isChallengeHIstoryLoading &&
        challengeHistory?.challengeHistories?.map((history, index) => (
          <ChallengeProfile
            key={index}
            name={history.challengeName}
            interest={history.challengeCategory}
            Date={history.startDate + ' ~ ' + history.endDate}
          />
        ))}
    </ScrollView>
  );
};

export default HistoryChallengeScreen;
