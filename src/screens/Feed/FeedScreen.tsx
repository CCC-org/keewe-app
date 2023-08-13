import React, { useEffect, useRef, useState } from 'react';
import FeedList from './FeedList';
import { useInfiniteFeed } from '../../utils/hooks/feedInifiniteScroll/useInfiniteFeed';
import FeedScreenChallenge from '../../components/challenge/FeedScreenChallenge';
import { useScrollToTop } from '@react-navigation/native';
import GoToUploadButton from '../../components/buttons/GoToUploadButton';
import { useQueryClient } from '@tanstack/react-query';
import { FeedQueryKeys } from '../../utils/api/FeedAPI';
import { RefreshControl } from 'react-native';
import { IOScrollView } from 'react-native-intersection-observer';
import { UserSpecificChallengeQueryKeys } from '../../utils/api/UserSpecificChallenge';
import MainLottie from '../../components/lotties/MainLottie';
import MainTabHeader from '../../components/header/MainTabHeader';
import { notificationKeys } from '../../utils/api/notification/notification';

const FeedScreen = ({ navigation }) => {
  const scrollViewRef = useRef<any>(null);
  const queryClient = useQueryClient();

  useScrollToTop(scrollViewRef);

  const { feedList, feedListIsLoading, touchBookMark, fetchNextPage, feedListQueryClient } =
    useInfiniteFeed('https://api-keewe.com/api/v1/insight');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      queryClient.invalidateQueries(FeedQueryKeys.getFeed());
      queryClient.invalidateQueries(notificationKeys.checkNotification());
    });
    return unsubscribe;
  }, [navigation]);

  const [pageRefreshing, setPageRefreshing] = useState(false);

  const onRefresh = () => {
    setPageRefreshing(true);
    queryClient.invalidateQueries(notificationKeys.checkNotification());
    feedListQueryClient.invalidateQueries(FeedQueryKeys.getFeed());
    feedListQueryClient
      .invalidateQueries(UserSpecificChallengeQueryKeys.getUserSpecificChallenge())
      .then(() => setPageRefreshing(false));
  };

  const [yPos, setYPos] = useState(0);

  useEffect(() => {
    const te = setInterval(() => {
      if (!scrollViewRef?.current) return;
      scrollViewRef.current.scrollTo({ y: yPos });
    }, 1000);

    return () => {
      clearInterval(te);
    };
  }, [yPos]);

  if (feedListIsLoading) {
    return <MainLottie />;
  }
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
        <MainTabHeader text="홈" />
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

export default FeedScreen;
