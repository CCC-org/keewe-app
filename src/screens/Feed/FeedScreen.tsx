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
  } = useInfiniteFeed();

  // challenge section.

  // if (feedListIsLoading || challengeData.isLoading) {
  //   return <MainLottie />;
  // }
  // <Text style={[theme.fonts.text.display, { marginBottom: 32 }]}>홈</Text>

  return (
    <>
      <FeedList
        UpperComponent={<FeedScreenChallenge />}
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
