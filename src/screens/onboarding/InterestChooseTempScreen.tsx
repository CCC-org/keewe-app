import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import InterestChooseSection from './InterestChooseSection';
import { TOTAL_TAG } from '../../constants/Interests';

const TempScreen = () => {
  const totalCategory = TOTAL_TAG;
  const [customCategory, setCustomCategory] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  const handleSelectTag = (tag: string) => {
    if (!selectedCategory.includes(tag)) {
      setSelectedCategory([...selectedCategory, tag]);
    } else {
      const newArr = selectedCategory.filter((e) => e !== tag);
      setSelectedCategory(newArr);
    }
  };
  const handleCreateCategory = () => alert('add');
  return (
    <View>
      <InterestChooseSection
        totalCategory={[...customCategory, ...totalCategory]}
        selectedCategory={selectedCategory}
        onSelect={handleSelectTag}
        onCreateCategory={handleCreateCategory}
      />
    </View>
  );
};

export default TempScreen;
