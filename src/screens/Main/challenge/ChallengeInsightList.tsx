import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { InsightAPI, InsightQueryKeys } from '../../../utils/api/InsightAPI';
import { useGetUserId } from '../../../utils/hooks/useGetUserId';
import FeedItem from '../../Feed/FeedItem';

interface ChallengeInsightListProps {
  challengeId: number;
  total: boolean;
}

const ChallengeInsightList = ({ challengeId, total }: ChallengeInsightListProps) => {
  const [data, setData] = useState<InsightData[]>([]);
  const [cursor, setCursor] = useState<number>();
  const userId = useGetUserId();

  useQuery(
    InsightQueryKeys.getChallengeInsight({
      cursor,
      limit: 5,
      writerId: total ? String(userId) : undefined,
    }),
    () =>
      InsightAPI.getChallengeInsight({
        cursor,
        limit: 5,
        writerId: total ? String(userId) : undefined,
      }),
    {
      onSuccess: (response: ChallengeInsightGetResponse) => {
        setData((prev) => [...prev, ...response.data]);
      },
    },
  );

  const renderItem = ({ item, index }) => {
    return (
      <FeedItem
        key={item.id}
        onBookMarkClick={() => {
          return;
        }}
        insight={item}
        localId={String(userId)}
      />
    );
  };

  const onEndReached = () => {
    setCursor(data[data.length - 1].id);
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

export default ChallengeInsightList;
