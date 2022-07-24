import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import NicknameCreationScreen from './screens/NicknameCreationScreen';
import { RootScreen } from './navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Root" component={RootScreen} />
            <Stack.Screen name="NicknameCreation" component={NicknameCreationScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="dark" />
      </>
    );
  }
}
