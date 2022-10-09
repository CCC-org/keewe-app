import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BookMarkScreen from './BookMarkScreen';
import ChallengesScreen from './ChallengesScreen';
import MyPageScreen from './MyPageScreen';
import { RootScreen } from '../../navigation';
import MainScreen from './MainScreen';

const Tabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Root" component={RootScreen} />
      <Tab.Screen name="Main" component={MainScreen} />
      <Tab.Screen name="BookMark" component={BookMarkScreen} />
      <Tab.Screen name="Challenges" component={ChallengesScreen} />
      <Tab.Screen name="MyPage" component={MyPageScreen} />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({});
