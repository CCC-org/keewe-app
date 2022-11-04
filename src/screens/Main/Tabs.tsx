import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BookMarkScreen from './BookMarkScreen';
import ChallengesScreen from './ChallengesScreen';
import MyPageScreen from './MyPageScreen';
import { RootScreen } from '../../navigation';
import MainScreen from './MainScreen';
import HomeScreen from '../Home/HomeScreen';

const Tabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Tab.Group>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Main" component={MainScreen} />
        <Tab.Screen name="BookMark" component={BookMarkScreen} />
        <Tab.Screen name="Challenges" component={ChallengesScreen} />
        <Tab.Screen name="MyPage" component={MyPageScreen} />
        <Tab.Screen name="Root" component={RootScreen} />
      </Tab.Group>
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({});
