import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import useCachedResources from './src/utils/hooks/useCachedResources';
import NicknameCreationScreen from './src/screens/onboarding/NicknameCreationScreen';
import SignUpScreen from './src/screens/onboarding/SignUpScreen';
import LoginScreen from './src/screens/login/LoginScreen';
import ChallengeIntroScreen from './src/screens/challenge/ChallengeIntroScreen';
import { RootScreen } from './src/navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import light from './src/theme/light';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

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
              <Stack.Navigator>
                <Stack.Screen name="Root" component={RootScreen} />
                <Stack.Screen name="NicknameCreation" component={NicknameCreationScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="ChallengeIntro" component={ChallengeIntroScreen} />
              </Stack.Navigator>
            </QueryClientProvider>
          </NavigationContainer>
          <StatusBar style="dark" />
        </PaperProvider>
      </>
    );
  }
}
