import React, { useEffect, useRef, useState } from 'react';
import FeedList from './FeedList';
import { useInfiniteFeed } from '../../utils/hooks/feedInifiniteScroll/useInfiniteFeed';
import FeedScreenChallenge from '../../components/challenge/FeedScreenChallenge';
import { useNavigationState, useScrollToTop } from '@react-navigation/native';
import GoToUploadButton from '../../components/buttons/GoToUploadButton';
import { useQueryClient } from '@tanstack/react-query';
import { FeedQueryKeys } from '../../utils/api/FeedAPI';
import { RefreshControl, ScrollView, StyleSheet, Text } from 'react-native';
import { IOScrollView } from 'react-native-intersection-observer';
import { UserSpecificChallengeQueryKeys } from '../../utils/api/UserSpecificChallenge';

const FeedScreen = ({ navigation }) => {
  const scrollViewRef = useRef<any>(null);
  const queryClient = useQueryClient();
  // useScrollToTop(scrollViewRef);

  const { feedList, feedListIsLoading, touchBookMark, fetchNextPage, feedListQueryClient } =
    useInfiniteFeed('https://api-keewe.com/api/v1/insight');

  useEffect(() => {
    console.log('first');
    const unsubscribe = navigation.addListener('focus', () => {
      queryClient.invalidateQueries(FeedQueryKeys.getFeed());
    });

    return unsubscribe;
  }, [navigation]);

  // useEffect(() => {
  //   console.log('mounted');

  //   return () => {
  //     console.log('unmounted');
  //     console.log('**********************');
  //   };
  // });

  const [pageRefreshing, setPageRefreshing] = useState(false);

  const onRefresh = () => {
    setPageRefreshing(true);
    feedListQueryClient.invalidateQueries(FeedQueryKeys.getFeed());
    feedListQueryClient
      .invalidateQueries(UserSpecificChallengeQueryKeys.getUserSpecificChallenge())
      .then(() => setPageRefreshing(false));
  };

  const [yPos, setYPos] = useState(0);

  useEffect(() => {
    const te = setInterval(() => {
      scrollViewRef.current.scrollTo({ y: yPos });
    }, 1000);

    return () => {
      clearInterval(te);
    };
  }, [yPos]);

  return (
    <>
      <IOScrollView
        ref={scrollViewRef}
        refreshControl={<RefreshControl refreshing={pageRefreshing} onRefresh={onRefresh} />}
        onScroll={(e) => {
          const { y } = e.nativeEvent.contentOffset;
          if (y === 0) return;
          setYPos(y);
        }}
      >
        <FeedList
          scrollViewRef={scrollViewRef}
          upperComponent={<FeedScreenChallenge />}
          feedList={feedList}
          feedListQueryClient={feedListQueryClient}
          fetchNextPage={fetchNextPage}
          touchBookMark={touchBookMark}
          feedListIsLoading={feedListIsLoading}
        />
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
