import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import useCachedResources from './hooks/useCachedResources';
import NicknameCreationScreen from './screens/NicknameCreationScreen';
import { RootScreen } from './navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import light from './theme/light';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './screens/SignUpScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        <PaperProvider theme={light}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Root" component={RootScreen} />
              <Stack.Screen name="NicknameCreation" component={NicknameCreationScreen} />
            </Stack.Navigator>
          </NavigationContainer>
          <StatusBar style="dark" />
        </PaperProvider>
      </>
    );
  }
}
