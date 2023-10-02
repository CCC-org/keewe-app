/* eslint-disable indent */
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationApi, notificationKeys } from '../../utils/api/notification/notification';
import { SvgXml } from 'react-native-svg';
import { notificationXml } from '../../constants/Icons/notifications/notification';
import { useTheme } from 'react-native-paper';
import MainLottie from '../../components/lotties/MainLottie';
import { getTimeDiff } from '../../utils/helper/time/getTimeDiff';

const NotificationScreen = ({ navigation }) => {
  const queryClient = useQueryClient();
  const { fonts } = useTheme();

  useEffect(() => {
    const unsubscribeBlur = navigation.addListener('blur', () => {
      notificationApi.patchReadAll();
      queryClient.invalidateQueries(notificationKeys.getNotificationList());
      queryClient.invalidateQueries(notificationKeys.checkNotification());
    });

    return unsubscribeBlur;
  }, [navigation]);

  const { data, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: notificationKeys.getNotificationList(),
    queryFn: ({ pageParam = null }) => {
      return notificationApi.getNotificationList(pageParam);
    },
    getNextPageParam: (lastPage: Notification['data']) => {
      return lastPage?.nextCursor;
    },
  });

  const mutation = useMutation({
    mutationFn: (notificationId: string | number) => {
      return notificationApi.patchMarkAsRead(notificationId);
    },
    onMutate: (notificationId: string | number) => {
      const prev = queryClient.getQueryData<Notification['data']>(
        notificationKeys.getNotificationList(),
      );
      if (!prev) return;

      for (const page of prev.pages) {
        for (const notification of page.notifications) {
          if (notification.id === notificationId) {
            notification.read = true;
          }
        }
      }

      queryClient.setQueryData(notificationKeys.getNotificationList(), prev);
      queryClient.invalidateQueries(notificationKeys.checkNotification());
    },
  });

  const navigateByReference = (refInfo: {
    category: string;
    referenceId: string;
    id: string | number;
  }) => {
    mutation.mutate(refInfo.id);
    switch (refInfo.category) {
      case 'REACTION':
      case 'COMMENT':
        navigation.navigate('DetailedPost', {
          screen: 'DetailedPost',
          insightId: refInfo.referenceId,
        });
        break;
      case 'FOLLOW':
        navigation.navigate('Profile', {
          screen: 'Profile',
          userId: refInfo.referenceId,
        });
        break;
      case 'CHALLENGE_INVITE':
        navigation.navigate('ChallengeParticipation', {
          challengeId: refInfo.referenceId,
        });
        break;
      default:
        break;
    }
  };

  if (!data) return <MainLottie />;
  const flatData = data.pages.flatMap((page: Notification['data']) => {
    return page?.notifications ?? [];
  });

  const handleOnEndReached = () => {
    if (isLoading) return;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (data.pages[data.pages.length - 1]?.nextCursor === null) return;
    fetchNextPage();
  };

  const renderItem = ({ item }: { item: NotificationElement }) => {
    return (
      <Pressable
        onPress={() => {
          navigateByReference({
            category: item.category,
            referenceId: item.referenceId,
            id: item.id,
          });
        }}
        key={item.id}
        style={[styles.container, { backgroundColor: item.read ? 'white' : '#f8f8f4' }]}
      >
        <SvgXml style={{ marginRight: 16 }} xml={notificationXml[item.category.toLowerCase()]} />
        <View>
          <Text style={[fonts.text.body2.regular, { color: '#12131480' }]}>{item.title}</Text>
          <Text>{item.contents}</Text>

          <Text style={[fonts.text.body2.regular, { color: '#12131480' }]}>
            {getTimeDiff(item.createdAt)}
          </Text>
        </View>
      </Pressable>
    );
  };

  if (isLoading) return <MainLottie />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList data={flatData} renderItem={renderItem} onEndReached={handleOnEndReached} />
    </SafeAreaView>
  );
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
