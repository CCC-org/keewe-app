import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { getAccessToken } from '../../../utils/hooks/asyncStorage/Login';
import axios from 'axios';
import { InsightData } from '../../../types/Feed/Feedinsights';

interface Props {
  id: number;
  userId: number;
}
const URL = 'https://api-keewe.com/api/v1/insight/my-page/';
const MyPageFeedList = ({ id, userId }: Props) => {
  const queryClient = useQueryClient();

  const { data: feedList } = useInfiniteQuery({
    queryKey: ['feedList', 'tab', id],
    queryFn: async (context) => {
      const token = await getAccessToken();
      try {
        const res = await axios.get(
          URL + String(userId) + `?limit=${100}&cursor=` + '&drawerId=' + String(id),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        return res.data.data as InsightData[];
      } catch (err) {
        alert(err);
      }
    },
  });

  console.log('feedList.data: ', feedList);

  return (
    <View>
      {Array.isArray(feedList?.pages) &&
        feedList?.pages.map((group) => {
          return (
            <View>
              <Text>{JSON.stringify(group)}</Text>
              <Text>-----------------------</Text>
            </View>
          );
        })}
    </View>
  );
};

export default MyPageFeedList;

const styles = StyleSheet.create({});
