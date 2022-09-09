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
      for (let i = 0; i < selectedCategory.length; i++) {
        if (selectedCategory[i] === tag) {
          selectedCategory.splice(i, 1);
          i--;
        }
      }
    }
  };
  return (
    <View>
      <InterestChooseSection
        totalCategory={[...customCategory, ...totalCategory]}
        selectedCategory={selectedCategory}
        onSelect={handleSelectTag}
      />
    </View>
  );
};

export default TempScreen;

/*useEffect(() => {
    if (
      selectedCategory.filter(
        (element) => selectedCategory[selectedCategory.length - 1] === element,
      ).length === 2
    ) {
      for (let i = 0; i < selectedCategory.length; i++) {
        if (selectedCategory[i] === selectedCategory[selectedCategory.length - 1]) {
          selectedCategory.splice(i, 1);
          i--;
        }
      }
    }
  }, [selectedCategory]);*/
