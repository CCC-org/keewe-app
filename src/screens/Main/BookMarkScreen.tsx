import { Text, StyleSheet, SafeAreaView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'react-native-paper';
import FeedList from '../Feed/FeedList';
import { useQueryClient } from '@tanstack/react-query';
import { useInfiniteFeed } from '../../utils/hooks/feedInifiniteScroll/useInfiniteFeed';
import { FeedQueryKeys } from '../../utils/api/FeedAPI';
import { IOScrollView } from 'react-native-intersection-observer';
import { RefreshControl } from 'react-native-gesture-handler';
import MainTabHeader from '../../components/header/MainTabHeader';
import { notificationKeys } from '../../utils/api/notification/notification';

const BookMarkScreen = ({ navigation }) => {
  const theme = useTheme();
  const scrollViewRef = useRef<any>(null);
  const queryClient = useQueryClient();

  const { feedList, feedListIsLoading, touchBookMark, fetchNextPage, feedListQueryClient } =
    useInfiniteFeed('https://api-keewe.com/api/v1/insight/bookmark');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      queryClient.invalidateQueries(FeedQueryKeys.getBookMarkFeed());
      queryClient.invalidateQueries(notificationKeys.checkNotification());
    });
    return unsubscribe;
  }, [navigation]);

  const [pageRefreshing, setPageRefreshing] = useState(false);

  const onRefresh = () => {
    setPageRefreshing(true);
    queryClient.invalidateQueries(notificationKeys.checkNotification());
    feedListQueryClient
      .invalidateQueries(FeedQueryKeys.getBookMarkFeed())
      .then(() => setPageRefreshing(false));
  };

  const [yPos, setYPos] = useState(0);

  useEffect(() => {
    if (feedList?.pages[0]?.length) {
      const te = setInterval(() => {
        scrollViewRef.current.scrollTo({ y: yPos });
      }, 1000);

      return () => {
        clearInterval(te);
      };
    }
  }, [yPos, feedList]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <IOScrollView
        ref={scrollViewRef}
        refreshControl={<RefreshControl refreshing={pageRefreshing} onRefresh={onRefresh} />}
        onScroll={(e) => {
          const { y } = e.nativeEvent.contentOffset;
          if (y === 0) return;
          setYPos(y);
        }}
      >
        <MainTabHeader text="북마크" />
        {feedList?.pages[0]?.length ? (
          <FeedList
            scrollViewRef={scrollViewRef}
            feedList={feedList}
            feedListQueryClient={feedListQueryClient}
            fetchNextPage={fetchNextPage}
            touchBookMark={touchBookMark}
            feedListIsLoading={feedListIsLoading}
          />
        ) : (
          <Text
            style={{
              fontFamily: 'pretendardSemiBold',
              color: `${theme.colors.graphic.black}30`,
              textAlign: 'center',
              ...styles.placeHolder,
            }}
          >
            북마크한 인사이트가 없어요
          </Text>
        )}
      </IOScrollView>
    </SafeAreaView>
  );
};

export default BookMarkScreen;

const styles = StyleSheet.create({
  placeHolder: {
    fontSize: 16,
    marginTop: '50%',
  },
});
