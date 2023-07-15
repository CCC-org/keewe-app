import { StyleSheet } from 'react-native';
import React, {useLayoutEffect} from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserFollowersScreen from '../../screens/follow/UserFollowersScreen';
import UserFolloweeScreen from '../../screens/follow/UserFollowingScreen';

const Tab = createMaterialTopTabNavigator();

const FollowTopTabs = ({ route, navigation }) => {
  const { userId, follower, following, nickname } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: nickname,
    });
  }, []);

  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: 'white' }}
      screenOptions={{
        title: '팔로워',
      }}
    >
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
            title: follower + ' ' + '팔로워',
          }}
        />
        <Tab.Screen
          name="Following"
          component={UserFolloweeScreen}
          initialParams={{ userId }}
          options={{
            title: following + ' ' + '팔로잉',
          }}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};

export default FollowTopTabs;

const styles = StyleSheet.create({});
