import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { notificationApi, notificationKeys } from '../../utils/api/notification/notification';
import { NotificationElement } from '../../types/notification/notification';
import { SvgXml } from 'react-native-svg';
import { notificationXml } from '../../constants/Icons/notifications/notification';
import { useTheme } from 'react-native-paper';

const NotificationScreen = () => {
  const queryClient = useQueryClient();
  const { fonts } = useTheme();
  const { data, isLoading, isError, fetchNextPage } = useInfiniteQuery({
    queryKey: notificationKeys.getNotificationList(),
    queryFn: ({ pageParam = null }) => {
      return notificationApi.getNotificationList(pageParam);
    },
    getNextPageParam: (lastPage: Notification['data']) => {
      return lastPage?.nextCursor;
    },
  });

  if (!data) return <Text> data is being fetched...</Text>;
  const flatData = data.pages.flatMap((page: Notification['data']) => {
    return page?.notifications ?? [];
  });

  const renderItem = ({ item }: { item: NotificationElement }) => {
    return (
      <View
        key={item.id}
        style={[styles.container, { backgroundColor: item.read ? 'white' : '#f8f8f4' }]}
      >
        <SvgXml style={{ marginRight: 16 }} xml={notificationXml[item.category.toLowerCase()]} />
        <View>
          <Text style={[fonts.text.body2.regular, { color: '#12131480' }]}>{item.title}</Text>
          <Text>{item.contents}</Text>
          <Text style={[fonts.text.body2.regular, { color: '#12131480' }]}>time placeholder</Text>
        </View>
      </View>
    );
  };

  return <FlatList data={flatData} renderItem={renderItem} onEndReached={() => fetchNextPage()} />;
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 84,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 16,
  },
  title: {},
});
