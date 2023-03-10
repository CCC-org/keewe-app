import React, { useEffect, useRef, useState } from 'react';
import FeedList from './FeedList';
import { useInfiniteFeed } from '../../utils/hooks/feedInifiniteScroll/useInfiniteFeed';
import FeedScreenChallenge from '../../components/challenge/FeedScreenChallenge';
import { useScrollToTop } from '@react-navigation/native';
import GoToUploadButton from '../../components/buttons/GoToUploadButton';
import { useQueryClient } from '@tanstack/react-query';
import { FeedQueryKeys } from '../../utils/api/FeedAPI';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { IOScrollView } from 'react-native-intersection-observer';
import MemoizedFeedList from '../Main/mypage/MemoizedFeedList';
import { UserSpecificChallengeQueryKeys } from '../../utils/api/UserSpecificChallenge';

const FeedScreen = ({ navigation }) => {
  const scrollViewRef = useRef<any>(null);
  const queryClient = useQueryClient();
  useScrollToTop(scrollViewRef);

  const { feedList, feedListIsLoading, touchBookMark, fetchNextPage, feedListQueryClient } =
    useInfiniteFeed('https://api-keewe.com/api/v1/insight');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      queryClient.invalidateQueries(FeedQueryKeys.getFeed());
    });

    return unsubscribe;
  }, [navigation]);
  // if (feedListIsLoading || challengeData.isLoading) {
  //   return <MainLottie />;
  // }
  // <Text style={[theme.fonts.text.display, { marginBottom: 32 }]}>홈</Text>
  const [scrollHeight, setScrollHeight] = useState(0);
  const [pageRefreshing, setPageRefreshing] = useState(false);

  const onRefresh = () => {
    setPageRefreshing(true);
    feedListQueryClient.invalidateQueries(FeedQueryKeys.getFeed());
    feedListQueryClient
      .invalidateQueries(UserSpecificChallengeQueryKeys.getUserSpecificChallenge())
      .then(() => setPageRefreshing(false));
  };

  return (
    <>
      <IOScrollView
        ref={scrollViewRef}
        refreshControl={<RefreshControl refreshing={pageRefreshing} onRefresh={onRefresh} />}
      >
        {/* <View style={{ height: scrollHeight }}> */}
        <FeedList
          scrollViewRef={scrollViewRef}
          upperComponent={<FeedScreenChallenge />}
          feedList={feedList}
          feedListQueryClient={feedListQueryClient}
          fetchNextPage={fetchNextPage}
          touchBookMark={touchBookMark}
          feedListIsLoading={feedListIsLoading}
        />
        {/* <MemoizedFeedList
        scrollViewRef={scrollViewRef}
        upperComponent={<FeedScreenChallenge />}
        feedList={feedList}
        feedListQueryClient={feedListQueryClient}
        fetchNextPage={fetchNextPage}
        touchBookMark={touchBookMark}
        feedListIsLoading={feedListIsLoading}
      /> */}
        {/* </View> */}
      </IOScrollView>
      <GoToUploadButton />
    </>
  );
};

const styles = StyleSheet.create({
  feedCtn: {
    padding: 16.5,
  },
});

export default FeedScreen;
