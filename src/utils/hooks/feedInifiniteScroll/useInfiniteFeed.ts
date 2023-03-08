import { InfiniteData, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FeedAPI, FeedQueryKeys } from '../../api/FeedAPI';
import { FeedInsight, InsightData } from '../../../types/Feed/Feedinsights';
import { postFeedBookMark } from '../../api/FeedBookMark';
import { MypageQueryKeys } from '../../api/mypageAPI';

export function useInfiniteFeed(fetchUrl: string) {
  const feedListQueryClient = useQueryClient();
  const [cursor, setCursor] = useState(0);
  const [limit, setLimit] = useState(5);
  const [follow, setFollow] = useState(false);

  let key;
  if (fetchUrl.includes('drawerId')) {
    key = MypageQueryKeys.getFolderInsight(
      fetchUrl.slice(fetchUrl.indexOf('?') + 10),
      fetchUrl.slice(45, fetchUrl.indexOf('?')),
    );
  } else {
    key = FeedQueryKeys.getFeed();
  }

  const {
    data: feedList,
    isLoading: feedListIsLoading,
    fetchNextPage,
  } = useInfiniteQuery<FeedInsight['data'] | undefined>({
    queryKey: key,
    queryFn: (context) => {
      return FeedAPI.getFeed(fetchUrl, context.pageParam, limit, follow);
    },
    getNextPageParam: (lastpage) => {
      const lastFeedId = lastpage?.[lastpage.length - 1]?.id || 0;
      return lastFeedId;
    },
  });
  const { mutate: touchBookMark, isLoading: bookMarkIsLoading } = useMutation({
    mutationFn: postFeedBookMark,
    onMutate: (id: number) => {
      feedListQueryClient.cancelQueries(key);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const prev = feedListQueryClient.getQueryData<InfiniteData<InsightData[]>>(key)!;
      for (const page of prev.pages) {
        for (const info of page) {
          if (info.id === id) {
            info.bookmark = !info.bookmark;
          }
        }
      }
      feedListQueryClient.setQueryData(key, prev);
    },
    onSettled: () => {
      feedListQueryClient.invalidateQueries(key);
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
