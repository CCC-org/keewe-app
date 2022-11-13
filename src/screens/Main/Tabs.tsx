import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BookMarkScreen from './BookMarkScreen';
import ChallengesScreen from './ChallengesScreen';
import MyPageScreen from './MyPageScreen';
import { RootScreen } from '../../navigation';
import FeedScreen from '../Feed/FeedScreen';
import HomeScreen from '../Home/HomeScreen';
import App from '../../../App';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

const Tab = createBottomTabNavigator();
const Tabs = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Tab.Navigator sceneContainerStyle={{ backgroundColor: 'white' }}>
        <Tab.Screen name="Feed" component={FeedScreen} />
        <Tab.Screen name="BookMark" component={BookMarkScreen} />
        <Tab.Screen name="Challenges" component={ChallengesScreen} />
        <Tab.Screen name="MyPage" component={MyPageScreen} />
        <Tab.Screen name="Root" component={RootScreen} />
      </Tab.Navigator>
    </QueryClientProvider>
  );
};

export default Tabs;

const styles = StyleSheet.create({});
