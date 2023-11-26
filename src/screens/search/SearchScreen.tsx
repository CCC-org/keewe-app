import React, { createContext, useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SearchInsightScreen from './SearchInsightScreen';
import SearchUserScreen from './SearchUserScreen';
import SearchChallengeScreen from './SearchChallengeScreen';
import { useTheme } from 'react-native-paper';
import RecentSearchScreen, { RecentSearchItem } from './RecentSearchScreen';

const Tab = createMaterialTopTabNavigator();

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const SearchContext = createContext({ searchText: '', setSearchText: (text: string) => {} });

const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(true);
  const [count, setCount] = useState(0);
  const searchRef = useRef('');
  const textInputRef = useRef(null);
  const theme = useTheme();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <TextInput
          ref={textInputRef}
          right={
            <TextInput.Icon
              style={{ opacity: searchRef.current.length ? 0.2 : 0, marginLeft: 24 }}
              onPress={() => {
                setCount((prev) => prev + 1);
                searchRef.current = '';
                if (textInputRef.current) (textInputRef.current as any).clear();
              }}
              name="close-circle"
            />
          }
          onChangeText={(text) => {
            setCount((prev) => prev + 1);
            searchRef.current = text;
          }}
          placeholder="검색어를 입력해주세요"
          activeUnderlineColor="rgba(18, 19, 20, 0.1)"
          style={styles.textInput}
          onSubmitEditing={handleSubmit}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          dense={true}
        />
      ),
    });
  }, [count]);

  const handleSubmit = () => {
    if (!searchRef.current) return;
    const inputText = searchRef.current;
    if (!inputText) return;
    RecentSearchItem.set(inputText);
    setSearchText(inputText);
    setIsFocused(false);
  };

  if (isFocused) {
    return (
      <SearchContext.Provider value={{ searchText, setSearchText }}>
        <RecentSearchScreen setIsFocused={setIsFocused} />
      </SearchContext.Provider>
    );
  }

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

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    borderWidth: 1,
  },
  textInput: {
    backgroundColor: '#fff',
    paddingHorizontal: 2,
    marginLeft: 24,
    fontFamily: 'pretendard',
    flexDirection: 'row',
    alignItems: 'center',
    width: 280,
  },
  clearButton: {
    marginLeft: 10,
  },
  focused: {
    borderBottomWidth: 2,
    borderBottomColor: 'blue', // Change to your preferred color
  },
});

export default SearchScreen;
