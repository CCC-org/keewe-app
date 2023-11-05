import React, { createContext, useLayoutEffect, useState } from 'react';
import { ScrollView, Text, TextInput } from 'react-native';
import {
  MaterialTopTabView,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import SearchInsightScreen from './SearchInsightScreen';
import SearchUserScreen from './SearchUserScreen';
import SearchChallengeScreen from './SearchChallengeScreen';
// type SearchType = 'INSIGHT' | 'USER' | 'CHALLENGE';

const Tab = createMaterialTopTabNavigator();

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const SearchContext = createContext({ searchText: '', setSearchText: (text: string) => {} });

const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');

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
        initialRouteName="Insight"
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: { backgroundColor: 'powderblue' },
        }}
      >
        <Tab.Screen name="Insight" component={SearchInsightScreen} />
        <Tab.Screen name="Challenge" component={SearchChallengeScreen} />
        <Tab.Screen name="User" component={SearchUserScreen} />
      </Tab.Navigator>
    </SearchContext.Provider>
  );
};

export default SearchScreen;
