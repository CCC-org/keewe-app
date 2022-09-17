import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import HeaderBackButton from './src/components/header/HeaderBackButton';
import { NavigationContainer } from '@react-navigation/native';
import useCachedResources from './src/utils/hooks/useCachedResources';
import NicknameCreationScreen from './src/screens/onboarding/NicknameCreationScreen';
import SignUpScreen from './src/screens/onboarding/SignUpScreen';
import LoginScreen from './src/screens/login/LoginScreen';
import CategorySelectScreen from './src/screens/challenge/CategorySelectScreen';
import ChallengeInfoScreen from './src/screens/challenge/ChallengeInfoScreen';
import CategoryCreateScreen from './src/screens/challenge/CategoryCreateScreen';
import ChallengeCreationApprovedScreen from './src/screens/challenge/ChallengeCreationApprovedScreen';
import ChallengeGoalSettingScreen from './src/screens/challenge/ChallengeGoalSettingScreen';

import { RootScreen } from './src/navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import light from './src/theme/light';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChallengeSubjectCreationScreen from './src/screens/challenge/ChallengeSubjectCreationScreen';
import Challenges from './stack/Challenges';
import ServiceIntroOneScreen from './src/screens/onboarding/ServiceIntroOneScreen';
import { View } from 'react-native';
import OnboardingIntroHeaderButton from './src/components/buttons/OnboardingIntroHeaderButton';
import ServiceIntroTwoScreen from './src/screens/onboarding/ServiceIntroTwoScreen';
import ServiceIntroThreeScreen from './src/screens/onboarding/ServiceIntroThreeScreen';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

const headerOptions = {
  headerBackVisible: false,
  headerLeft: () => <HeaderBackButton />,
};

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        <PaperProvider theme={light}>
          <NavigationContainer>
            <QueryClientProvider client={queryClient}>
              <Stack.Navigator
                screenOptions={{
                  contentStyle: { backgroundColor: 'white' },
                  headerTitleAlign: 'center',
                  animation: 'slide_from_right',
                  headerTitleStyle: {
                    fontSize: 16,
                  },
                  animationDuration: 1000,
                }}
              >
                <Stack.Group
                  screenOptions={{
                    headerStyle: { backgroundColor: 'white' },
                    title: '',
                    headerShadowVisible: false,
                  }}
                >
                  <Stack.Screen name="Root" component={RootScreen} options={{ title: 'Root' }} />
                  <Stack.Screen
                    name="NicknameCreation"
                    component={NicknameCreationScreen}
                    options={headerOptions}
                  />
                  <Stack.Screen name="SignUp" component={SignUpScreen} options={headerOptions} />
                  <Stack.Screen name="Login" component={LoginScreen} options={headerOptions} />
                  <Stack.Screen
                    name="CategorySelect"
                    component={CategorySelectScreen}
                    options={headerOptions}
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
                  />
                  <Stack.Screen
                    name="ChallengeGoalSetting"
                    component={ChallengeGoalSettingScreen}
                    options={headerOptions}
                  />
                </Stack.Group>
                <Stack.Group
                  screenOptions={{
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeft: () => <View></View>,
                    headerRight: () => <OnboardingIntroHeaderButton />,
                    headerStyle: {
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  <Stack.Screen name="ServiceIntroOne" component={ServiceIntroOneScreen} />
                  <Stack.Screen name="ServiceIntroTwo" component={ServiceIntroTwoScreen} />
                  <Stack.Screen name="ServiceIntroThree" component={ServiceIntroThreeScreen} />
                </Stack.Group>
              </Stack.Navigator>
            </QueryClientProvider>
          </NavigationContainer>
          <StatusBar style="dark" />
        </PaperProvider>
      </>
    );
  }
}
