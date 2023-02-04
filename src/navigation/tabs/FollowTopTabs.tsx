import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserFollowersScreen from '../../screens/follow/UserFollowersScreen';
import UserFollowingScreen from '../../screens/follow/UserFollowingScreen';

const Tab = createMaterialTopTabNavigator();

const FollowTopTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Followers" component={UserFollowersScreen} />
      <Tab.Screen name="Following" component={UserFollowingScreen} />
    </Tab.Navigator>
  );
};

export default FollowTopTabs;

const styles = StyleSheet.create({});
