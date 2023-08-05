import { Pressable } from 'react-native';
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
import { useQuery } from '@tanstack/react-query';
import { notificationApi, notificationKeys } from '../../utils/api/notification/notification';
import { settingsIcon } from '../../../assets/svgs/settingsIcon';
import { ChallengeAPI } from '../../utils/api/ChallengeAPI';

const Tab = createBottomTabNavigator();

const Tabs = ({ navigation, route }) => {
  const userId = useGetUserId();

  if (route?.params) {
    const { type, id } = route.params;
    navigation.setParams({ type: '', id: '' });
    if (type === 'insight') {
      navigation.push('DetailedPost', {
        screen: 'DetailedPost',
        insightId: id,
      });
    }
    if (type === 'profile') {
      if (userId === id) {
        navigation.push('MyPage', {
          screen: 'MyPage',
          userId: id,
        });
      } else {
        navigation.push('Profile', {
          screen: 'Profile',
          userId: id,
        });
      }
    }
    if (type === 'challenge') {
      ChallengeAPI.getChallengeParticipation().then((response) => {
        if (response?.challengeId === id) {
          navigation.navigate('ChallengeDetail', {
            screen: 'ChallengeDetail',
            challengeId: response?.challengeId,
            challengeName: response?.name,
            interest: response?.interest,
          });
        } else {
          navigation.navigate('ChallengeParticipation', {
            screen: 'ChallengeParticipation',
            challengeId: id,
          });
        }
      });
    }
  }

  const { data } = useQuery(
    notificationKeys.checkNotification(),
    () => notificationApi.checkNotification(),
    {
      enabled: userId !== undefined && userId !== 0,
    },
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
