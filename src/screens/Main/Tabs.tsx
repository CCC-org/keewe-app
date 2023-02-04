import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BookMarkScreen from './BookMarkScreen';
import ChallengesScreen from './ChallengesScreen';
import { RootScreen } from '../../navigation';
import FeedScreen from '../Feed/FeedScreen';
import HomeScreen from '../Home/HomeScreen';
import App from '../../../App';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SvgXml } from 'react-native-svg';
import {
  homeOn,
  homeOff,
  bookmarkOn,
  bookmarkOff,
  challengeOn,
  challengeOff,
  mypageOn,
  mypageOff,
} from '../../constants/Icons/Navigation/NavigationIconsXml';
import { useGetUserId } from '../../utils/hooks/useGetUserId';
import MyPageScreen from './mypage/MyPageScreen';
const queryClient = new QueryClient();
const Tab = createBottomTabNavigator();

const Tabs = () => {
  const userId = useGetUserId();
  return (
    // <QueryClientProvider client={queryClient}>
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
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
        }}
        name="Challenges"
        component={ChallengesScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <SvgXml xml={bookmarkOn} /> : <SvgXml xml={bookmarkOff} />,
        }}
        name="BookMark"
        component={BookMarkScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <SvgXml xml={mypageOn} /> : <SvgXml xml={mypageOff} />,
        }}
        name="MyPage"
        component={MyPageScreen}
        initialParams={{
          userId: String(userId),
        }}
      />
      <Tab.Screen name="Root" component={RootScreen} />
    </Tab.Navigator>
    // </QueryClientProvider>
  );
};

export default Tabs;

const styles = StyleSheet.create({});
