import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserFollowersScreen from '../../screens/follow/UserFollowersScreen';
import UserFollowingScreen from '../../screens/follow/UserFollowingScreen';

const Tab = createMaterialTopTabNavigator();

const FollowTopTabs = ({ route }) => {
  const { userId } = route.params;

  return (
    <Tab.Navigator sceneContainerStyle={{ backgroundColor: 'white' }}>
      <Tab.Group
        screenOptions={{
          tabBarLabelStyle: { fontSize: 14 },
          tabBarIndicatorStyle: {
            backgroundColor: '#B0E817',
          },
        }}
      >
        <Tab.Screen
          name="Followers"
          component={UserFollowersScreen}
          initialParams={{ userId }}
          options={{
            title: '팔로워',
          }}
        />
        <Tab.Screen
          name="Following"
          component={UserFollowingScreen}
          initialParams={{ userId }}
          options={{
            title: '팔로잉',
          }}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};

export default FollowTopTabs;

const styles = StyleSheet.create({});
