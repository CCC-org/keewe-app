import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import IconTag from '../../components/buttons/IconTag';
import 마케팅 from './마케팅.svg';
interface InterestChooseSectionProps {
  totalCategory: string[];
  selectedCategory?: string;
  onSelect: (value: string) => void;
}

const InterestChooseSection = ({
  totalCategory,
  selectedCategory,
  onSelect,
}: InterestChooseSectionProps) => {
  return (
    <View style={styles.tagList}>
      {totalCategory.map((category) => (
        <IconTag
          key={category}
          title={category}
          isSelected={selectedCategory === category}
          icon={<Text>왜 안돼</Text>}
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
