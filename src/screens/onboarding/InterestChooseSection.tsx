import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
import IconTag from '../../components/buttons/IconTag';
import { IconXml, SelectedIconXml } from '../../constants/InterestsIconXml';
import Icon from 'react-native-vector-icons/AntDesign';
import { useTheme } from 'react-native-paper';

interface InterestChooseSectionProps {
  totalCategory: string[];
  customCategory: string[];
  selectedCategory: string[];
  onSelect: (value: string) => void;
  onCreateCategory: () => void;
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
  customCategory,
  selectedCategory,
  onSelect,
  onCreateCategory,
}: InterestChooseSectionProps) => {
  const theme = useTheme();
  return (
    <View>
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
        {customCategory.map((category, idx) => (
          <IconTag
            key={category}
            title={category}
            isSelected={selectedCategory.includes(category)}
            backgroundColor={handleBackgroundColor(idx)}
            onClick={() => onSelect(category)}
          />
        ))}
      </View>

      <View style={{ ...styles.addBtn, borderColor: `${theme.colors.graphic.black}10` }}>
        <Pressable
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={onCreateCategory}
        >
          <Icon name="plus" size={24} color={theme.colors.graphic.black} />
          <Text style={{ ...theme.fonts.text.body2.bold, marginLeft: 5 }}>직접 추가</Text>
        </Pressable>
      </View>
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
  addBtn: {
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    marginVertical: 8,
    width: 110,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
