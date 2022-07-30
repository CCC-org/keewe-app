import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import useCachedResources from './src/utils/hooks/useCachedResources';
import NicknameCreationScreen from './src/screens/onboarding/NicknameCreationScreen';
import SignUpScreen from './src/screens/onboarding/SignUpScreen';
import KaKaoLoginScreen from './src/screens/login/KakaoLoginScreen';
import { RootScreen } from './src/navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import light from './src/theme/light';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GetTokenScreen from './src/screens/login/GetTokenScreen';
import ActivitySelectionScreen from './src/screens/onboarding/ActivitySelectionScreen';
// redux toolkit
import { Provider as ReduxProvider } from 'react-redux';
import { store as reduxStore } from './src/redux/store';
const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        <ReduxProvider store={reduxStore}>
          <PaperProvider theme={light}>
            <NavigationContainer>
              <QueryClientProvider client={queryClient}>
                <Stack.Navigator>
                  <Stack.Screen name="Root" component={RootScreen} />
                  <Stack.Screen name="NicknameCreation" component={NicknameCreationScreen} />
                  <Stack.Screen name="SignUp" component={SignUpScreen} />
                  <Stack.Screen name="ActivitySelection" component={ActivitySelectionScreen} />
                  <Stack.Screen name="GetToken" component={GetTokenScreen} />
                  <Stack.Screen name="KaKaoLogin" component={KaKaoLoginScreen} />
                </Stack.Navigator>
              </QueryClientProvider>
            </NavigationContainer>
            <StatusBar style="dark" />
          </PaperProvider>
        </ReduxProvider>
      </>
    );
  }
}
