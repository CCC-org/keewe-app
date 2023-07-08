import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BookMarkScreen from './BookMarkScreen';
import ChallengesScreen from './ChallengesScreen';
import FeedScreen from '../Feed/FeedScreen';
import { SvgXml } from 'react-native-svg';
import {
  bookmarkOn,
  bookmarkOff,
  challengeOn,
  challengeOff,
  mypageOn,
  mypageOff,
  homeOn,
  homeOff,
} from '../../constants/Icons/Navigation/NavigationIconsXml';
import { useGetUserId } from '../../utils/hooks/useGetUserId';
import MyPageScreen from './mypage/MyPageScreen';
import alarmEmpty from '../../constants/Icons/alarm/alarmEmpty';
import alarmExist from '../../constants/Icons/alarm/alarmExist';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { notificationApi, notificationKeys } from '../../utils/api/notification/notification';
import { settingsIcon } from '../../../assets/svgs/settingsIcon';
import { threeDots } from '../../../assets/svgs/constantSvgs/threeDots';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const userId = useGetUserId();

  const navigation = useNavigation();

  const { data } = useQuery(notificationKeys.checkNotification(), () =>
    notificationApi.checkNotification(),
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShadowVisible: false,
        headerTitle: '',
        headerRight: () => (
          <Pressable onPress={() => navigation.navigate('Notification')}>
            <SvgXml style={{ marginRight: 16 }} xml={data?.exist ? alarmExist : alarmEmpty} />
          </Pressable>
        ),
      }}
      sceneContainerStyle={{ backgroundColor: 'white' }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <SvgXml xml={homeOn} /> : <SvgXml xml={homeOff} />,
        }}
        name="Feed"
        component={FeedScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <SvgXml xml={challengeOn} /> : <SvgXml xml={challengeOff} />,
          title: '',
        }}
        name="Challenges"
        component={ChallengesScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <SvgXml xml={bookmarkOn} /> : <SvgXml xml={bookmarkOff} />,
          title: '',
        }}
        name="BookMark"
        component={BookMarkScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <SvgXml xml={mypageOn} /> : <SvgXml xml={mypageOff} />,
          title: '',
          headerRight: () => {
            return (
              <Pressable
                style={{ marginHorizontal: 18 }}
                onPress={() => navigation.navigate('Settings')}
              >
                <SvgXml xml={settingsIcon} />
              </Pressable>
            );
          },
          headerStyle: {
            backgroundColor: '#F1F1E9',
          },
        }}
        name="MyPage"
        component={MyPageScreen}
        initialParams={{
          userId: String(userId),
          enteredByTab: true,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({});
