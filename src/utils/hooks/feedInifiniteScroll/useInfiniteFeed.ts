import { InfiniteData, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FeedAPI, FeedQueryKeys } from '../../api/FeedAPI';
import { FeedInsight, InsightData } from '../../../types/Feed/Feedinsights';
import { postFeedBookMark } from '../../api/FeedBookMark';

export function useInfiniteFeed(fetchUrl: string) {
  const feedListQueryClient = useQueryClient();
  const [cursor, setCursor] = useState(0);
  const [limit, setLimit] = useState(5);
  const [follow, setFollow] = useState(false);

  const {
    data: feedList,
    isLoading: feedListIsLoading,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery<FeedInsight['data'] | undefined>({
    queryKey: FeedQueryKeys.getFeed(),
    queryFn: (context) => {
      return FeedAPI.getFeed(fetchUrl, context.pageParam, limit, follow);
    },
    getNextPageParam: (lastpage) => {
      const lastFeedId = lastpage?.[lastpage.length - 1]?.id || 0;
      return lastFeedId;
    },
  });
  const { mutate: touchBookMark } = useMutation({
    mutationFn: postFeedBookMark,
    onMutate: (id: number) => {
      feedListQueryClient.cancelQueries(FeedQueryKeys.getFeed());
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const prev = feedListQueryClient.getQueryData<InfiniteData<InsightData[]>>(
        FeedQueryKeys.getFeed(),
      )!;
      for (const page of prev.pages) {
        for (const info of page) {
          if (info.id === id) {
            info.bookmark = !info.bookmark;
          }
        }
      }
      feedListQueryClient.setQueryData(FeedQueryKeys.getFeed(), prev);
    },
    onSettled: () => {
      feedListQueryClient.invalidateQueries(FeedQueryKeys.getFeed());
    },
  });

  return {
    feedList,
    feedListIsLoading,
    touchBookMark,
    fetchNextPage,
    feedListQueryClient,
  };
}
