import { Pressable, StyleSheet, Text } from 'react-native';
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
import { alarm } from '../../constants/Icons/alarm/alarm';
import { useNavigation } from '@react-navigation/native';
const Tab = createBottomTabNavigator();

const Tabs = () => {
  const userId = useGetUserId();

  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShadowVisible: false,
        headerTitle: '',
        headerRight: () => (
          <Pressable onPress={() => navigation.navigate('Notification')}>
            <SvgXml style={{ marginRight: 16 }} xml={alarm} />
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
      {/* Root screen moved to settings. */}
      {/* <Tab.Screen name="Root" component={RootScreen} /> */}
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({});
