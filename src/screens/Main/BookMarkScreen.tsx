import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'react-native-paper';
import FeedList from '../Feed/FeedList';
import { useQueryClient } from '@tanstack/react-query';
import { useInfiniteFeed } from '../../utils/hooks/feedInifiniteScroll/useInfiniteFeed';
import { FeedQueryKeys } from '../../utils/api/FeedAPI';
import { IOScrollView } from 'react-native-intersection-observer';
import { RefreshControl } from 'react-native-gesture-handler';

const BookMarkScreen = ({ navigation }) => {
  const theme = useTheme();
  const scrollViewRef = useRef<any>(null);
  const queryClient = useQueryClient();

  const { feedList, feedListIsLoading, touchBookMark, fetchNextPage, feedListQueryClient } =
    useInfiniteFeed('https://api-keewe.com/api/v1/insight/bookmark');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      queryClient.invalidateQueries(FeedQueryKeys.getBookMarkFeed());
    });

    return unsubscribe;
  }, [navigation]);

  const [pageRefreshing, setPageRefreshing] = useState(false);

  const onRefresh = () => {
    setPageRefreshing(true);
    feedListQueryClient
      .invalidateQueries(FeedQueryKeys.getBookMarkFeed())
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
        <View style={styles.header}>
          <Text style={theme.fonts.text.display}>북마크</Text>
        </View>
        <FeedList
          scrollViewRef={scrollViewRef}
          feedList={feedList}
          feedListQueryClient={feedListQueryClient}
          fetchNextPage={fetchNextPage}
          touchBookMark={touchBookMark}
          feedListIsLoading={feedListIsLoading}
        />
      </IOScrollView>
    </>
  );
};

export default BookMarkScreen;

const styles = StyleSheet.create({
  header: {
    margin: 16,
  },
});
