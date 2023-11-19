import React, { useContext, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from '../../components/Themed';
import { Pressable, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SearchContext } from './SearchScreen';
import { Entypo } from '@expo/vector-icons';

interface Props {
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

const RecentSearchScreen = ({ setIsFocused }: Props) => {
  const [recentSearch, setRecentSearch] = useState<string[]>([]);
  const { setSearchText } = useContext(SearchContext);
  const selectRecentSearch = (term: string) => {
    setSearchText(term);
    setIsFocused(false);
  };

  useEffect(() => {
    RecentSearchItem.get().then(setRecentSearch);
  }, []);

  const clearSearchHistory = async () => {
    try {
      await AsyncStorage.removeItem('recentSearch');
      setRecentSearch([]);
    } catch (error) {
      console.error('Error clearing recent searches:', error);
    }
  };

  const removeSearchTerm = async (term) => {
    const updatedTerms = recentSearch.filter((t) => t !== term);
    setRecentSearch(updatedTerms);
    await AsyncStorage.setItem('recentSearch', JSON.stringify(updatedTerms));
  };

  return (
    <ScrollView style={styles.recentSearchScreen}>
      <View style={styles.header}>
        <Text style={[styles.headerText]}>최근 검색어</Text>
        <Pressable onPress={clearSearchHistory}>
          <Text
            style={{
              fontSize: 16,
              color: '#486006',
            }}
          >
            전체 삭제
          </Text>
        </Pressable>
      </View>
      {recentSearch.map((term, index) => (
        <View key={index} style={styles.searchItem}>
          <Pressable onPress={() => selectRecentSearch(term)} style={styles.termText}>
            <Text>{term}</Text>
          </Pressable>
          <Pressable onPress={() => removeSearchTerm(term)} style={styles.removeButton}>
            <Entypo name="cross" size={24} color="black" />
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  recentSearchScreen: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  termText: {},
  removeButton: {
    position: 'absolute',
    right: 16,
    top: 12,
  },
});

export const RecentSearchItem = {
  set: async (term: string) => {
    try {
      const existingTerms = await RecentSearchItem.get();
      const updatedTerms = Array.from(new Set([term, ...existingTerms]));

      const limitedTerms = updatedTerms.slice(0, 30);

      await AsyncStorage.setItem('recentSearch', JSON.stringify(limitedTerms));
    } catch (error) {
      console.error('Error updating recent searches:', error);
    }
  },
  get: async () => {
    try {
      const value = await AsyncStorage.getItem('recentSearch');
      return value ? JSON.parse(value) : [];
    } catch (error) {
      console.error('Error retrieving recent searches:', error);
      return [];
    }
  },
  deleteAll: async () => {
    try {
      await AsyncStorage.removeItem('recentSearch');
    } catch (error) {
      console.error('Error clearing recent searches:', error);
    }
  },
};

export default RecentSearchScreen;
