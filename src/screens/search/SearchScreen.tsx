import React, { useLayoutEffect, useState } from 'react';
import { ScrollView, Text, TextInput } from 'react-native';
import { View } from '../../components/Themed';
import { AntDesign } from '@expo/vector-icons';
import BlandTextInput from '../../components/texts/BlandTextInput';
import SmallTextInput from '../../components/texts/SmallTextInput';
import Tabs from '../Main/Tabs';
import Tab from '../../components/tabs/Tab';
type SearchType = 'INSIGHT' | 'USER' | 'CHALLENGE';
const SearchScreen = ({ navigation }) => {
  //    need a search bar component that appends to the title section,
  // and the search bar should return a text input that allows the user to type in a search query
  // the search bar should also have a cancel button that resets the search bar to its original state
  const [searchText, setSearchText] = useState('');
  const [currentTab, setCurrentTab] = useState<SearchType>('INSIGHT');
  navigation.setOptions({
    headerTitle: () => (
      <TextInput value={searchText} onChangeText={setSearchText} placeholder="Search" />
    ),
  });

  return (
    <ScrollView>
      <Tab selectedTab={currentTab} prevTab={currentTab} />
    </ScrollView>
  );
};

export default SearchScreen;
