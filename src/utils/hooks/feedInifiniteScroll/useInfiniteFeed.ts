import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FeedAPI, FeedQueryKeys } from '../../api/FeedAPI';
import { FeedInsight } from '../../../types/Feed/Feedinsights';
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
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
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
  console.log(feedList);
  console.table(feedList);
  const { mutate: touchBookMark, isLoading: bookMarkIsLoading } = useMutation({
    mutationFn: postFeedBookMark,
    onSettled: () => {
      feedListQueryClient.invalidateQueries(FeedQueryKeys.getFeed());
    },
  });

  return {
    feedList,
    feedListIsLoading,
    touchBookMark,
    bookMarkIsLoading,
    fetchNextPage,
    feedListQueryClient,
  };
}
