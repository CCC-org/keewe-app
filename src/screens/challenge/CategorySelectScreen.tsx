import React, { useState } from 'react';
import { TOTAL_TAG } from '../../constants/Interests';
import ChallengeCategorySelectSection from './ChallengeCategorySelectSection';
import ConditionalButton from '../../components/buttons/ConditionalButton';

const CategorySelectScreen = ({ navigation, route }) => {
  const customCategory: string[] = route.params?.category ?? [];

  const [totalCategory, setTotalCategory] = useState<string[]>(TOTAL_TAG);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    route.params?.selectedCategory ?? undefined,
  );

  const handleSelectTag = (tag: string) =>
    setSelectedCategory(selectedCategory === tag ? undefined : tag);
  const addCategory = () => {
    setSelectedCategory(undefined);
    navigation.navigate('CategoryCreate', { customCategory });
  };
  const isActive = selectedCategory !== undefined;

  return (
    <>
      <ChallengeCategorySelectSection
        totalCategory={[...customCategory, ...totalCategory]}
        selectedCategory={selectedCategory}
        onSelect={handleSelectTag}
        onCreateCategory={addCategory}
      />
      <ConditionalButton
        isActive={isActive}
        text={isActive ? '다음' : '카테고리를 선택해주세요'}
        color={'black'}
        width={350}
        onPress={() => console.log('다음으로')}
      />
    </>
  );
};

export default CategorySelectScreen;
