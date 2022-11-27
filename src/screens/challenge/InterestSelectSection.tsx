import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Accordion from '../../components/accordions/Accordion';
import Tag from '../../components/buttons/tag';
import { useTheme } from 'react-native-paper';
import { TOTAL_TAG } from '../../constants/Interests';

interface InterestSelectSectionProps {
  selectedTag: string;
  onSelect: (value: string) => void;
}

const InterestSelectSection = ({ selectedTag, onSelect }: InterestSelectSectionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const theme = useTheme();
  const title = <Text style={theme.fonts.text.body2.bold}>내 관심사</Text>;
  return (
    <View>
      <Text style={theme.fonts.text.display}>챌린지 카테고리를</Text>
      <Text style={theme.fonts.text.display}>1개 선택하세요</Text>
      <Accordion title={title} isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} openHeight={200}>
        <View style={styles.tagList}>
          {TOTAL_TAG.map((tag) => (
            <Tag
              key={tag}
              title={tag}
              isSelected={selectedTag === tag}
              onClick={() => onSelect(tag)}
            ></Tag>
          ))}
        </View>
      </Accordion>
      <View>
        <View style={styles.accordion}>
          <Text style={theme.fonts.text.body2.bold}>전체</Text>
          <Text
            style={[
              theme.fonts.text.body1.regular,
              { color: theme.colors.brand.onprimary.container },
            ]}
          >
            직접 추가
          </Text>
        </View>
        <View style={styles.tagList}>
          {TOTAL_TAG.map((tag) => (
            <Tag
              key={tag}
              title={tag}
              isSelected={selectedTag === tag}
              onClick={() => onSelect(tag)}
            ></Tag>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  accordion: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 8 },
  tagList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: 8,
  },
});

export default InterestSelectSection;
