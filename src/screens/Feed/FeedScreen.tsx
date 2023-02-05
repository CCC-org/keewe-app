import React, { useRef } from 'react';
import FeedList from './FeedList';
import { useInfiniteFeed } from '../../utils/hooks/feedInifiniteScroll/useInfiniteFeed';
import FeedScreenChallenge from '../../components/challenge/FeedScreenChallenge';
import { useScrollToTop } from '@react-navigation/native';
import GoToUploadButton from '../../components/buttons/GoToUploadButton';
const FeedScreen = () => {
  const scrollViewRef = useRef<any>(null);
  useScrollToTop(scrollViewRef);

  const { feedList, feedListIsLoading, touchBookMark, fetchNextPage, feedListQueryClient } =
    useInfiniteFeed('https://api-keewe.com/api/v1/insight');

  // if (feedListIsLoading || challengeData.isLoading) {
  //   return <MainLottie />;
  // }
  // <Text style={[theme.fonts.text.display, { marginBottom: 32 }]}>홈</Text>

  return (
    <>
      <FeedList
        scrollViewRef={scrollViewRef}
        upperComponent={<FeedScreenChallenge />}
        feedList={feedList}
        feedListQueryClient={feedListQueryClient}
        fetchNextPage={fetchNextPage}
        touchBookMark={touchBookMark}
        feedListIsLoading={feedListIsLoading}
      />
      <GoToUploadButton />
    </>
  );
};

export default FeedScreen;
