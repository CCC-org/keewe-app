import React, { useState } from 'react';
import { FlatList } from 'react-native';

interface TotalInsightListProps {
  challengeId: number;
}

const TotalInsightList = ({ challengeId }: TotalInsightListProps) => {
  const [data, setData] = useState<CurrentChallenge[]>([]);
  const [cursor, setCursor] = useState<number>();

  const renderItem = ({ item, index }) => {
    return (
      <CurrentChallengeProfile
        key={index}
        name={item.challengeName}
        challengeId={item.challengeId}
        interest={item.challengeCategory}
        challengeDescription={item.challengeIntroduction}
        insightNumber={item.insightCount}
        participate={false}
      />
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      onEndReached={onEndReached}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    />
  );
};

export default TotalInsightList;
