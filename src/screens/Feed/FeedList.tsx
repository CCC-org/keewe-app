import { RefreshControl, StyleSheet, Text, View } from 'react-native';
import React, { Fragment, useState } from 'react';
import { InfiniteData, QueryClient, UseMutateFunction } from '@tanstack/react-query';
import { InsightData } from '../../types/Feed/Feedinsights';
import { IOScrollView, InView } from 'react-native-intersection-observer';
import FeedItem from './FeedItem';
import { FeedQueryKeys } from '../../utils/api/FeedAPI';
import { UserSpecificChallengeQueryKeys } from '../../utils/api/UserSpecificChallenge';
import { ScrollView } from 'react-native-gesture-handler';

interface FeedListProps {
  feedList: InfiniteData<InsightData[] | undefined> | undefined;
  fetchNextPage: () => void;
  touchBookMark: UseMutateFunction<void, unknown, number, unknown>;
  upperComponent?: React.ReactNode;
  feedListQueryClient: QueryClient;
  feedListIsLoading: boolean;
  writer?: { writerId: number; nickname: string; title: string; image: string };
  scrollViewRef?: React.RefObject<any>;
}

const FeedList = ({
  upperComponent: UpperComponent,
  feedList,
  fetchNextPage,
  touchBookMark,
  feedListQueryClient,
  scrollViewRef,
  writer,
}: FeedListProps) => {
  return (
    <ScrollView contentContainerStyle={styles.feedCtn} ref={scrollViewRef}>
      {UpperComponent}
      {feedList?.pages.map((group, i) => {
        return (
          <Fragment key={i}>
            {group?.map((insight, idx) => {
              if (!insight.writer && writer) {
                insight.writer = writer;
              }

              if (group.length - 1 === idx && feedList.pages.length - 1 === i) {
                return (
                  <InView
                    key={insight.id}
                    onChange={() => {
                      console.log('onChagne');
                      fetchNextPage();
                    }}
                  >
                    <View style={{ borderWidth: 1, borderColor: 'red' }}>
                      <FeedItem onBookMarkClick={touchBookMark} insight={insight} />
                    </View>
                  </InView>
                );
              }
              return (
                <Fragment key={insight.id}>
                  <FeedItem onBookMarkClick={touchBookMark} key={insight.id} insight={insight} />
                </Fragment>
              );
            })}
          </Fragment>
        );
      })}
    </ScrollView>
  );
};

//   return (
//     <IOScrollView
//       ref={scrollViewRef}
//       refreshControl={<RefreshControl refreshing={pageRefreshing} onRefresh={onRefresh} />}
//       contentContainerStyle={styles.feedCtn}
//     >
//       {UpperComponent}
//       {feedList?.pages.map((group, i) => {
//         return (
//           <Fragment key={i}>
//             {group?.map((insight, idx) => {
//               if (!insight.writer && writer) {
//                 insight.writer = writer;
//               }

//               if (group.length - 1 === idx && feedList.pages.length - 1 === i) {
//                 return (
//                   <InView
//                     key={insight.id}
//                     onChange={() => {
//                       console.log('onChagne');
//                       fetchNextPage();
//                     }}
//                   >
//                     <FeedItem onBookMarkClick={touchBookMark} insight={insight} />
//                   </InView>
//                 );
//               }
//               return (
//                 <Fragment key={insight.id}>
//                   <FeedItem onBookMarkClick={touchBookMark} key={insight.id} insight={insight} />
//                 </Fragment>
//               );
//             })}
//           </Fragment>
//         );
//       })}
//     </IOScrollView>
//   );
// };

export default FeedList;

const styles = StyleSheet.create({
  feedCtn: {
    padding: 16.5,
  },
});
