import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
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

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider, useTheme } from 'react-native-paper';
import OnboardingIntroHeaderButton from './src/components/buttons/OnboardingIntroHeaderButton';
import { RootScreen } from './src/navigation';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChallengeSubjectCreationScreen from './src/screens/challenge/ChallengeSubjectCreationScreen';
import ServiceIntroOneScreen from './src/screens/onboarding/ServiceIntroOneScreen';
import ServiceIntroTwoScreen from './src/screens/onboarding/ServiceIntroTwoScreen';
import TempSheetScreen from './src/screens/upload/TempSheetScreen';
import UploadScreen from './src/screens/upload/UploadScreen';
import DetailedPostScreen from './src/screens/detailedPost/DetailedPostScreen';
import light from './src/theme/light';
import ServiceIntroThreeScreen from './src/screens/onboarding/ServiceIntroThreeScreen';
import InsightSampleScreen from './src/screens/onboarding/InsightSampleScreen';
import Tabs from './src/screens/Main/Tabs';
import ShareScreen from './src/screens/detailedPost/ShareScreen';
import CommentsScreen from './src/screens/detailedPost/CommentsScreen';
import { TransitionPresets } from '@react-navigation/stack';
import HomeScreen from './src/screens/Home/HomeScreen';
import FeedScreen from './src/screens/Feed/FeedScreen';
import ProfileEditScreen from './src/screens/Main/mypage/ProfileEditScreen';
import NicknameEditingScreen from './src/screens/Main/mypage/NicknameEditingScreen';
import IntroductionEditingScreen from './src/screens/Main/mypage/IntroductionEditingScreen';
import InterestEditingScreen from './src/screens/Main/mypage/InterestEditingScreen';
import ChallengeJoinScreen from './src/screens/challenge/ChallengeJoinScreen';
import ChallengeJoinApprovedScreen from './src/screens/challenge/ChallengeJoinApprovedScreen';
import TitleScreen from './src/screens/title/TitleScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserFollowersScreen from './src/screens/follow/UserFollowersScreen';
import FollowTopTabs from './src/navigation/tabs/FollowTopTabs';

// const Stack = createNativeStackNavigator();
const Stack = createStackNavigator();
const headerOptions = {
  headerBackVisible: false,
  headerLeft: () => <HeaderBackButton />,
};
// Text style. font-family : pretendard
const queryClient = new QueryClient();
export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PaperProvider theme={light}>
          <NavigationContainer>
            <BottomSheetModalProvider>
              <QueryClientProvider client={queryClient}>
                <Stack.Navigator
                  screenOptions={{
                    cardStyle: { backgroundColor: 'white' },
                    // contentStyle: { backgroundColor: 'white' },
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                      fontSize: 16,
                    },
                    headerShadowVisible: false,
                    animationEnabled: false,
                    //...TransitionPresets.DefaultTransition,
                    // animation: 'slide_from_right',
                    // animationDuration: 1000,
                  }}
                >
                  {/* Tabs  */}
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
                      options={{
                        headerShown: true,
                        cardStyle: { backgroundColor: 'white' },
                      }}
                    />
                    {/* <Stack.Screen name={'Home'} component={HomeScreen}></Stack.Screen> */}
                  </Stack.Group>
                  <Stack.Screen
                    name={'ProfileEdit'}
                    component={ProfileEditScreen}
                    options={headerOptions}
                  />
                  <Stack.Screen
                    name={'NicknameEditing'}
                    component={NicknameEditingScreen}
                    options={headerOptions}
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
                  {/* 챌린지 그룹 */}
                  <Stack.Group
                    screenOptions={{
                      headerStyle: { backgroundColor: 'white' },
                      title: '',
                    }}
                  >
                    <Stack.Screen name="Root" component={RootScreen} options={{ title: 'Root' }} />

                    <Stack.Screen name="SignUp" component={SignUpScreen} options={headerOptions} />
                    <Stack.Screen name="Login" component={LoginScreen} options={headerOptions} />
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
                      name="ServiceIntroOne"
                      component={ServiceIntroOneScreen}
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
                      name="ServiceIntroTwo"
                      component={ServiceIntroTwoScreen}
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
                      name="ServiceIntroThree"
                      component={ServiceIntroThreeScreen}
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
                      options={{ title: '공유하기' }}
                    />
                    <Stack.Screen
                      name={'DetailedPost'}
                      component={DetailedPostScreen}
                      options={{
                        ...headerOptions,
                        headerStyle: { backgroundColor: '#F1F1E9' },
                        cardStyle: { backgroundColor: '#F1F1E9' },
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
                </Stack.Navigator>
              </QueryClientProvider>
            </BottomSheetModalProvider>
          </NavigationContainer>
          <StatusBar style="dark" />
        </PaperProvider>
      </GestureHandlerRootView>
    );
  }
}
