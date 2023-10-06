import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderBackButton from './src/components/header/HeaderBackButton';
import CategoryCreateScreen from './src/screens/challenge/CategoryCreateScreen';
import CategorySelectScreen from './src/screens/challenge/CategorySelectScreen';
import ChallengeCreationApprovedScreen from './src/screens/challenge/ChallengeCreationApprovedScreen';
import ChallengeGoalSettingScreen from './src/screens/challenge/ChallengeGoalSettingScreen';
import ChallengeInfoScreen from './src/screens/challenge/ChallengeInfoScreen';
import LoginScreen from './src/screens/login/LoginScreen';
import InterestChooseScreen from './src/screens/onboarding/InterestChooseScreen';
import NicknameCreationScreen from './src/screens/onboarding/NicknameCreationScreen';
import SignUpScreen from './src/screens/onboarding/SignUpScreen';
import useCachedResources from './src/utils/hooks/useCachedResources';
import * as Notifications from 'expo-notifications';
import * as ImagePicker from 'expo-image-picker';
import * as Clipboard from 'expo-clipboard';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, Pressable, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import OnboardingIntroHeaderButton from './src/components/buttons/OnboardingIntroHeaderButton';
import { RootScreen } from './src/navigation';
import ChallengeSubjectCreationScreen from './src/screens/challenge/ChallengeSubjectCreationScreen';
import ServiceIntroScreen from './src/screens/onboarding/ServiceIntroScreen';
import TempSheetScreen from './src/screens/upload/TempSheetScreen';
import UploadScreen from './src/screens/upload/UploadScreen';
import DetailedPostScreen from './src/screens/detailedPost/DetailedPostScreen';
import light from './src/theme/light';
import InsightSampleScreen from './src/screens/onboarding/InsightSampleScreen';
import Tabs from './src/screens/Main/Tabs';
import ChallengeParticipationScreen from './src/screens/Main/challenge/ChallengeParticipationScreen';
import ShareScreen from './src/screens/detailedPost/ShareScreen';
import CommentsScreen from './src/screens/detailedPost/CommentsScreen';
import ProfileEditScreen from './src/screens/Main/mypage/ProfileEditScreen';
import NicknameEditingScreen from './src/screens/Main/mypage/NicknameEditingScreen';
import IntroductionEditingScreen from './src/screens/Main/mypage/IntroductionEditingScreen';
import InterestEditingScreen from './src/screens/Main/mypage/InterestEditingScreen';
import ChallengeJoinScreen from './src/screens/challenge/ChallengeJoinScreen';
import ChallengeJoinApprovedScreen from './src/screens/challenge/ChallengeJoinApprovedScreen';
import TitleScreen from './src/screens/title/TitleScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProfileScreen from './src/screens/Main/mypage/ProfileScreen';
import UserFollowersScreen from './src/screens/follow/UserFollowersScreen';
import FollowTopTabs from './src/navigation/tabs/FollowTopTabs';
import Toasts from './src/components/bars/Toasts';
import { RootStackParamList } from './types';
import SettingsScreen from './src/screens/settings/SettingsScreen';
import PushNotificationSettingScreen from './src/screens/settings/PushNotificationSettingScreen';
import ChallengeDetailScreen from './src/screens/Main/challenge/ChallengeDetailScreen';
import CurrentChallengeScreen from './src/screens/Main/challenge/CurrentChallengeScreen';
import HistoryChallengeScreen from './src/screens/Main/challenge/HistoryChallengeScreen';
import { navigationRef } from './src/utils/hooks/navigaton/navigator';
import BlockedScreen from './src/screens/settings/BlockedScreen';
import FolderEditScreen from './src/screens/settings/folderSettings/FolderEditScreen';
import { Feather } from '@expo/vector-icons';
import NotificationScreen from './src/screens/notification/NotificationScreen';
import ErrorScreen from './src/screens/error/ErrorScreen';
import StatisticsScreen from './src/screens/statistics/StatisticsScreen';
import MyPageScreen from './src/screens/Main/mypage/MyPageScreen';
import ChallengeEditScreen from './src/screens/Main/challenge/ChallengeEditScreen';
import SubjectEditScreen from './src/screens/Main/challenge/SubjectEditScreen';
import GoalEditScreen from './src/screens/Main/challenge/GoalEditScreen';
import { getExpoToken, setExpoToken } from './src/utils/hooks/asyncStorage/Login';

const Stack = createStackNavigator<RootStackParamList>();

const headerOptions = {
  headerBackVisible: false,
  headerLeft: () => <HeaderBackButton />,
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const linking = {
  prefixes: ['https://keewe.kr', 'keewe://'],
  config: {
    screens: {
      Tabs: 'link/:type/:id',
    },
  },
};
const getToken = async () => {
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  setExpoToken(token);
};

const registerForPushNotificationsAsync = async () => {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  const token = await getExpoToken();
  if (token === null) {
    await Notifications.requestPermissionsAsync();
    getToken();
  }
  Notifications.setNotificationHandler({
    handleNotification: async () => {
      return {
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      };
    },
  });
  return;
};

const requestMediaLibraryPermissionsAsync = async () => {
  const permissionResult = await ImagePicker.getMediaLibraryPermissionsAsync();
  if (permissionResult.granted === false && permissionResult.canAskAgain) {
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    return;
  }
  return;
};

const requestCameraPermissionsAsync = async () => {
  const permissionResult = await ImagePicker.getCameraPermissionsAsync();
  if (permissionResult.granted === false && permissionResult.canAskAgain) {
    await ImagePicker.requestCameraPermissionsAsync();
    return;
  }
  return;
};

export default function App() {
  const isLoadingComplete = useCachedResources();
  const printNavigationState = (state) => {
    if (state) {
      const routes = state.routes.map((route) => route.name);
    }
  };

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      alert(notification);
      await Clipboard.setStringAsync(notification);
    });
    return () => subscription.remove();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    requestCameraPermissionsAsync();
    requestMediaLibraryPermissionsAsync();
    registerForPushNotificationsAsync();
    return (
      <NavigationContainer
        ref={navigationRef}
        linking={linking}
        onStateChange={printNavigationState}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <PaperProvider theme={light}>
            <QueryClientProvider client={queryClient}>
              <BottomSheetModalProvider>
                <SafeAreaProvider>
                  <Stack.Navigator
                    screenOptions={{
                      gestureEnabled: true,
                      gestureDirection: 'horizontal', // 수평 방향 스와이프
                      cardStyle: { backgroundColor: 'white' },
                      headerTitleAlign: 'center',
                      headerTitleStyle: {
                        fontSize: 16,
                      },
                      headerShadowVisible: false,
                    }}
                  >
                    <Stack.Group
                      screenOptions={{
                        headerShown: false,
                      }}
                    >
                      <Stack.Screen
                        name={'Tabs'}
                        component={Tabs}
                        options={{
                          cardStyle: { backgroundColor: 'white' },
                        }}
                      />
                      <Stack.Screen
                        name={'FollowTopTabs'}
                        component={FollowTopTabs}
                        options={({ route }) => {
                          return {
                            headerShown: true,
                            cardStyle: { backgroundColor: 'white' },
                            title: route.params.nickname ?? 'follows',
                            ...headerOptions,
                          };
                        }}
                      />
                    </Stack.Group>
                    <Stack.Screen
                      name={'ProfileEdit'}
                      component={ProfileEditScreen}
                      options={headerOptions}
                    />
                    <Stack.Screen
                      name={'NicknameEditing'}
                      options={headerOptions}
                      component={NicknameEditingScreen}
                    />
                    {/* Settings */}
                    <Stack.Screen
                      name={'Notification'}
                      component={NotificationScreen}
                      options={{
                        ...headerOptions,
                        title: '알림',
                        cardStyle: { backgroundColor: 'white' },
                      }}
                    />
                    <Stack.Screen
                      name={'Settings'}
                      component={SettingsScreen}
                      options={{
                        ...headerOptions,
                        title: '설정',
                        cardStyle: { backgroundColor: '#f8f8f4' },
                      }}
                    />
                    <Stack.Screen
                      name={'Block'}
                      component={BlockedScreen}
                      options={{
                        ...headerOptions,
                        title: '차단한 계정',
                        cardStyle: { backgroundColor: 'white' },
                      }}
                    />
                    <Stack.Screen
                      name={'FolderEdit'}
                      component={FolderEditScreen}
                      options={{
                        ...headerOptions,
                        title: '폴더 편집',
                        cardStyle: { backgroundColor: 'white' },
                      }}
                    />
                    <Stack.Screen
                      name={'PushNotificationSetting'}
                      component={PushNotificationSettingScreen}
                      options={{
                        ...headerOptions,
                        title: '푸시알림 설정',
                        cardStyle: { backgroundColor: '#f8f8f4' },
                      }}
                    />
                    <Stack.Screen
                      name={'IntroductionEditing'}
                      component={IntroductionEditingScreen}
                      options={headerOptions}
                    />
                    <Stack.Screen
                      name={'InterestEditing'}
                      component={InterestEditingScreen}
                      options={{ ...headerOptions, title: '' }}
                    />
                    <Stack.Screen
                      name={'Profile'}
                      component={ProfileScreen}
                      options={{
                        headerLeft: () => <HeaderBackButton />,
                        headerStyle: { backgroundColor: '#F1F1E9' },
                        title: '',
                      }}
                    />
                    <Stack.Screen
                      name={'MyProfile'}
                      component={MyPageScreen}
                      options={{
                        headerLeft: () => <HeaderBackButton />,
                        headerRight: () => {
                          return (
                            <Pressable style={{ marginRight: 12 }} onPress={() => alert('more')}>
                              <Feather name="more-vertical" size={24} color={'#000000'} />
                            </Pressable>
                          );
                        },
                        headerStyle: { backgroundColor: '#F1F1E9' },
                        title: '',
                      }}
                    />
                    <Stack.Group
                      screenOptions={{
                        headerStyle: { backgroundColor: 'white' },
                        title: '',
                      }}
                    >
                      <Stack.Screen
                        name="Root"
                        component={RootScreen}
                        options={{ title: 'Root' }}
                      />

                      <Stack.Screen
                        name="SignUp"
                        component={SignUpScreen}
                        options={{
                          headerLeft: () => <View></View>,
                        }}
                      />
                      <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{
                          headerLeft: () => <View></View>,
                        }}
                      />
                      <Stack.Screen
                        name="CategorySelect"
                        component={CategorySelectScreen}
                        options={{
                          ...headerOptions,
                        }}
                      />
                      <Stack.Screen
                        name="CategoryCreate"
                        component={CategoryCreateScreen}
                        options={headerOptions}
                      />
                      <Stack.Screen
                        name="ChallengeInfo"
                        component={ChallengeInfoScreen}
                        options={headerOptions}
                      />
                      <Stack.Screen
                        name="ChallengeCreationApproved"
                        component={ChallengeCreationApprovedScreen}
                      />
                      <Stack.Screen
                        name="ChallengeSubjectCreation"
                        component={ChallengeSubjectCreationScreen}
                        options={headerOptions}
                      />
                      <Stack.Screen
                        name="ChallengeDetail"
                        component={ChallengeDetailScreen}
                        options={headerOptions}
                      />
                      <Stack.Screen
                        name="ChallengeGoalSetting"
                        component={ChallengeGoalSettingScreen}
                        options={headerOptions}
                      />
                      <Stack.Screen
                        name="InterestChoose"
                        component={InterestChooseScreen}
                        options={headerOptions}
                      />
                      <Stack.Screen
                        name="ChallengeJoin"
                        component={ChallengeJoinScreen}
                        options={headerOptions}
                      />
                      <Stack.Screen
                        name="ChallengeJoinApproved"
                        component={ChallengeJoinApprovedScreen}
                        options={headerOptions}
                      />
                      <Stack.Screen
                        name="ChallengeCurrent"
                        component={CurrentChallengeScreen}
                        options={{ ...headerOptions, title: '모든 챌린지' }}
                      />
                      <Stack.Screen
                        name="ChallengeHistory"
                        component={HistoryChallengeScreen}
                        options={{ ...headerOptions, title: '종료된 챌린지' }}
                      />
                      <Stack.Screen
                        name="ChallengeParticipation"
                        component={ChallengeParticipationScreen}
                        options={{ ...headerOptions, title: '챌린지 참여하기' }}
                      />
                      <Stack.Screen
                        name="ChallengeEdit"
                        component={ChallengeEditScreen}
                        options={{ ...headerOptions, title: '내 목표' }}
                      />
                      <Stack.Screen
                        name="SubjectEdit"
                        component={SubjectEditScreen}
                        options={{ ...headerOptions, title: '나의 주제' }}
                      />
                      <Stack.Screen
                        name="GoalEdit"
                        component={GoalEditScreen}
                        options={{ ...headerOptions, title: '나의 목표' }}
                      />
                    </Stack.Group>
                    <Stack.Group
                      screenOptions={{
                        title: '',
                      }}
                    >
                      <Stack.Screen
                        name="NicknameCreation"
                        component={NicknameCreationScreen}
                        options={headerOptions}
                      />
                      <Stack.Screen
                        name="ServiceIntro"
                        component={ServiceIntroScreen}
                        options={{
                          headerTransparent: true,
                          headerTitle: '',
                          headerLeft: () => <View></View>,
                          headerRight: () => <OnboardingIntroHeaderButton />,
                          headerStyle: {
                            backgroundColor: 'transparent',
                          },
                        }}
                      />
                      <Stack.Screen
                        name="InsightSample"
                        options={{ ...headerOptions, headerStyle: { backgroundColor: '#F8F8F4' } }}
                        component={InsightSampleScreen}
                      />
                    </Stack.Group>
                    {/* 게시글 그룹 */}
                    <Stack.Group
                      screenOptions={{
                        headerStyle: { backgroundColor: 'white' },
                        title: '',
                      }}
                    >
                      <Stack.Screen
                        name={'Share'}
                        component={ShareScreen}
                        options={{ ...headerOptions, title: '공유하기' }}
                      />
                      <Stack.Screen
                        name={'DetailedPost'}
                        component={DetailedPostScreen}
                        options={{
                          ...headerOptions,
                          headerStyle: { backgroundColor: '#F1F1E9' },
                        }}
                      />
                      <Stack.Screen
                        name={'Comments'}
                        component={CommentsScreen}
                        options={{
                          ...headerOptions,
                          cardStyle: { backgroundColor: 'white' },
                          title: '댓글',
                        }}
                      />
                      <Stack.Screen
                        name={'Statistics'}
                        component={StatisticsScreen}
                        options={{
                          ...headerOptions,
                          cardStyle: { backgroundColor: 'white' },
                          title: '이 글의 통계',
                        }}
                      />
                    </Stack.Group>
                    {/* 실험적 그룹 */}
                    <Stack.Group>
                      <Stack.Screen
                        name={'Upload'}
                        component={UploadScreen}
                        options={{
                          title: '',
                          cardStyle: { backgroundColor: 'white' },
                        }}
                      />
                      <Stack.Screen
                        name={'TempSheet'}
                        component={TempSheetScreen}
                        options={{
                          title: '',
                          cardStyle: { backgroundColor: 'white' },
                        }}
                      />
                    </Stack.Group>

                    {/* 타이틀 페이지 */}
                    <Stack.Group>
                      <Stack.Screen
                        name={'Title'}
                        component={TitleScreen}
                        options={{
                          ...headerOptions,
                          title: '달성',
                          cardStyle: { backgroundColor: 'white' },
                        }}
                      />
                    </Stack.Group>
                    {/* 팔로우 팔로잉 페이지 */}
                    <Stack.Group>
                      <Stack.Screen
                        name={'UserFollowers'}
                        component={UserFollowersScreen}
                        options={{
                          title: '달성',
                          cardStyle: { backgroundColor: 'white' },
                        }}
                      />
                    </Stack.Group>
                    <Stack.Group>
                      <Stack.Screen
                        name={'Error'}
                        component={ErrorScreen}
                        options={{
                          title: '',
                          headerLeft: () => <View></View>,
                          cardStyle: { backgroundColor: 'white' },
                        }}
                      />
                    </Stack.Group>
                  </Stack.Navigator>
                </SafeAreaProvider>
              </BottomSheetModalProvider>
            </QueryClientProvider>
            <StatusBar style="dark" />
          </PaperProvider>
        </GestureHandlerRootView>
        <Toasts />
      </NavigationContainer>
    );
  }
}
