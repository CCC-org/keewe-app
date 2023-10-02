import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { ChallengeAPI } from '../../../utils/api/ChallengeAPI';
import ChallengeProfile from '../../../components/profile/ChallengeProfile';

const HistoryChallengeScreen = ({ route }) => {
  const { currentChallenge } = route.params;
  const [data, setData] = useState<HistoryChallenge[]>([]);
  const [cursor, setCursor] = useState<number>();
  useQuery(
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
        participate={currentChallenge === item.challengeId}
      />
    );
  };

  const onEndReached = () => {
    setCursor(data[data.length - 1].challengeParticipationId);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        onEndReached={onEndReached}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        style={{ paddingBottom: '100%', marginBottom: 80 }}
      />
    </SafeAreaView>
  );
};

export default HistoryChallengeScreen;
