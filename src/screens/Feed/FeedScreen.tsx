import React, { useEffect, useRef } from 'react';
import FeedList from './FeedList';
import { useInfiniteFeed } from '../../utils/hooks/feedInifiniteScroll/useInfiniteFeed';
import FeedScreenChallenge from '../../components/challenge/FeedScreenChallenge';
import { useScrollToTop } from '@react-navigation/native';
import GoToUploadButton from '../../components/buttons/GoToUploadButton';
import { useQueryClient } from '@tanstack/react-query';
import { FeedQueryKeys } from '../../utils/api/FeedAPI';

const FeedScreen = ({ navigation }) => {
  const scrollViewRef = useRef<any>(null);
  const queryClient = useQueryClient();
  useScrollToTop(scrollViewRef);

  const { feedList, feedListIsLoading, touchBookMark, fetchNextPage, feedListQueryClient } =
    useInfiniteFeed('https://api-keewe.com/api/v1/insight');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Screen is focused');
      queryClient.invalidateQueries(FeedQueryKeys.getFeed());
      // 실행하고자 하는 함수 또는 코드 작성
    });

    return unsubscribe;
  }, [navigation]);
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
