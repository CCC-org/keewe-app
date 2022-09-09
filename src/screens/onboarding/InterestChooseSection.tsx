import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SvgXml } from 'react-native-svg';
import IconTag from '../../components/buttons/IconTag';
import { IconXml, SelectedIconXml } from '../../constants/InterestsIconXml';
interface InterestChooseSectionProps {
  totalCategory: string[];
  selectedCategory: string[];
  onSelect: (value: string) => void;
}

const handleBackgroundColor = (idx) => {
  if (idx % 5 === 0) {
    return '#19A9FA';
  } else if (idx % 5 === 1) {
    return '#FF9417';
  } else if (idx % 5 === 2) {
    return '#FF42B2';
  } else if (idx % 5 === 3) {
    return '#7545FF';
  } else if (idx % 5 === 4) {
    return '#0FA7B0';
  }
};

const InterestChooseSection = ({
  totalCategory,
  selectedCategory,
  onSelect,
}: InterestChooseSectionProps) => {
  return (
    <View style={styles.tagList}>
      {totalCategory.map((category, idx) => (
        <IconTag
          key={category}
          title={category}
          isSelected={selectedCategory.includes(category)}
          backgroundColor={handleBackgroundColor(idx)}
          icon={
            <SvgXml
              xml={selectedCategory.includes(category) ? SelectedIconXml[idx] : IconXml[idx]}
            />
          }
          onClick={() => onSelect(category)}
        />
      ))}
    </View>
  );
};

export default InterestChooseSection;

const styles = StyleSheet.create({
  tagList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: 8,
  },
});
