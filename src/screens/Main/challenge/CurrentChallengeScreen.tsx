import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { ChallengeAPI } from '../../../utils/api/ChallengeAPI';
import CurrentChallengeProfile from '../../../components/profile/ChallengeProfileCurrent';

const CurrentChallengeScreen = ({ route }) => {
  const { currentChallenge } = route.params;
  const [data, setData] = useState<CurrentChallenge[]>([]);
  const [cursor, setCursor] = useState<number>();
  const { isLoading: isChallengeLoading } = useQuery(
    ['challenge', { cursor, limit: 10 }],
    () => ChallengeAPI.getChallengeCurrent({ cursor, limit: 10 }),
    {
      onSuccess: (response: CurrentChallenge[]) => {
        setData((prev) => [...prev, ...response]);
      },
    },
  );

  const renderItem = ({ item, index }) => {
    return (
      <CurrentChallengeProfile
        key={index}
        name={item.challengeName}
        challengeId={item.challengeId}
        interest={item.challengeCategory}
        challengeDescription={item.challengeIntroduction}
        insightNumber={item.insightCount}
        participate={currentChallenge === item.challengeId}
      />
    );
  };

  const onEndReached = () => {
    setCursor(data[data.length - 1].challengeId);
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

export default CurrentChallengeScreen;
