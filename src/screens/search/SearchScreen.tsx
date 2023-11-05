import React, { createContext, useLayoutEffect, useState } from 'react';
import { ScrollView, Text, TextInput } from 'react-native';
import {
  MaterialTopTabView,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import SearchInsightScreen from './SearchInsightScreen';
import SearchUserScreen from './SearchUserScreen';
import SearchChallengeScreen from './SearchChallengeScreen';
import { useTheme } from 'react-native-paper';
// type SearchType = 'INSIGHT' | 'USER' | 'CHALLENGE';

const Tab = createMaterialTopTabNavigator();

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const SearchContext = createContext({ searchText: '', setSearchText: (text: string) => {} });

const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const theme = useTheme();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <TextInput value={searchText} onChangeText={setSearchText} placeholder="Search" />
      ),
    });
  }, []);

  return (
    <SearchContext.Provider value={{ searchText, setSearchText }}>
      <Tab.Navigator
        initialRouteName="게시물"
        screenOptions={{
          tabBarActiveTintColor: 'black',
          tabBarIndicatorStyle: { backgroundColor: theme.colors.brand.primary.main },
          tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
          tabBarStyle: { backgroundColor: 'white' },
        }}
      >
        <Tab.Screen name="게시물" component={SearchInsightScreen} />
        <Tab.Screen name="챌린지" component={SearchChallengeScreen} />
        <Tab.Screen name="사용자" component={SearchUserScreen} />
      </Tab.Navigator>
    </SearchContext.Provider>
  );
};

export default SearchScreen;
