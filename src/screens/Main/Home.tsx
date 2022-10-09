import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BookMarkScreen from './BookMarkScreen';
import ChallengesScreen from './ChallengesScreen';
import MyPageScreen from './MyPageScreen';
import { RootScreen } from '../../navigation';

const Home = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Root" component={RootScreen} />
      <Tab.Screen name="BookMark" component={BookMarkScreen} />
      <Tab.Screen name="Challenges" component={ChallengesScreen} />
      <Tab.Screen name="MyPage" component={MyPageScreen} />
    </Tab.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({});
