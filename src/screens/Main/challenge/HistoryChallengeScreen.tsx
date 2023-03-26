import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { ChallengeAPI } from '../../../utils/api/ChallengeAPI';
import ChallengeProfile from '../../../components/profile/ChallengeProfile';

const HistoryChallengeScreen = () => {
  const [data, setData] = useState<HistoryChallenge[]>([]);
  const [cursor, setCursor] = useState<number>();
  const { isLoading: isChallengeLoading } = useQuery(
    ['challenge', { cursor, limit: 10 }],
    () => ChallengeAPI.getChallengeHistory({ cursor, limit: 10 }),
    {
      onSuccess: (response: HistoryChallenge[]) => {
        setData((prev) => [...prev, ...response]);
      },
    },
  );

  const renderItem = ({ item, index }) => {
    return (
      <ChallengeProfile
        key={index}
        challengeId={item.challengeId}
        name={item.challengeName}
        interest={item.challengeCategory}
        Date={item.startDate + ' ~ ' + item.endDate}
      />
    );
  };

  const onEndReached = () => {
    setCursor(data[data.length - 1].challengeParticipationId);
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      onEndReached={onEndReached}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      style={{ paddingBottom: '100%', marginBottom: 80 }}
    />
  );
};

export default HistoryChallengeScreen;
