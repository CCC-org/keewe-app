import React from 'react';
import FeedList from './FeedList';
import { useInfiniteFeed } from '../../utils/hooks/feedInifiniteScroll/useInfiniteFeed';
import FeedScreenChallenge from '../../components/challenge/FeedScreenChallenge';

const FeedScreen = () => {
  const {
    feedList,
    feedListIsLoading,
    touchBookMark,
    bookMarkIsLoading,
    fetchNextPage,
    feedListQueryClient,
  } = useInfiniteFeed('https://api-keewe.com/api/v1/insight');

  // challenge section.

  // if (feedListIsLoading || challengeData.isLoading) {
  //   return <MainLottie />;
  // }
  // <Text style={[theme.fonts.text.display, { marginBottom: 32 }]}>홈</Text>

  return (
    <>
      <FeedList
        upperComponent={<FeedScreenChallenge />}
        feedList={feedList}
        feedListQueryClient={feedListQueryClient}
        fetchNextPage={fetchNextPage}
        touchBookMark={touchBookMark}
        bookMarkIsLoading={bookMarkIsLoading}
        feedListIsLoading={feedListIsLoading}
      />
    </>
  );
};

export default FeedScreen;
