import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import Accordion from '../../components/accordions/Accordion';
import Tag from '../../components/buttons/tag';
import { useTheme } from 'react-native-paper';

interface ChallengeCategorySelectSectionProps {
  totalCategory: string[];
  selectedCategory?: string;
  onSelect: (value: string) => void;
  onCreateCategory: () => void;
}

const ChallengeCategorySelectSection = ({
  totalCategory,
  selectedCategory,
  onSelect,
  onCreateCategory,
}: ChallengeCategorySelectSectionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const theme = useTheme();
  const title = <Text style={theme.fonts.text.headline2}>내 관심사</Text>;
  return (
    <View>
      <Accordion
        title={title}
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        duration={300}
        openHeight={200}
      >
        <View style={styles.tagList}>
          {totalCategory.map((category) => (
            <Tag
              key={category}
              title={category}
              isSelected={selectedCategory === category}
              onClick={() => onSelect(category)}
            />
          ))}
        </View>
      </Accordion>
      <View>
        <View style={styles.accordion}>
          <Text style={theme.fonts.text.headline2}>전체</Text>
          <Pressable onPress={onCreateCategory}>
            <Text
              style={[
                theme.fonts.text.body1.regular,
                { color: theme.colors.brand.onprimary.container },
              ]}
              onPress={onCreateCategory}
            >
              직접 추가
            </Text>
          </Pressable>
        </View>
        <View style={styles.tagList}>
          {totalCategory.map((category) => (
            <Tag
              key={category}
              title={category}
              isSelected={selectedCategory === category}
              onClick={() => onSelect(category)}
            ></Tag>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  accordion: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 48,
    marginHorizontal: 10,
    marginBottom: 8,
  },
  tagList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: 8,
  },
});

export default ChallengeCategorySelectSection;
