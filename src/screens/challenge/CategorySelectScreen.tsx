import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { TOTAL_TAG } from '../../constants/Interests';
import ChallengeCategorySelectSection from './ChallengeCategorySelectSection';
import ConditionalButton from '../../components/buttons/ConditionalButton';
import Stepper from '../../components/stepper/Stepper';

const CategorySelectScreen = ({ navigation, route }) => {
  const customCategory: string[] = route.params?.category ?? [];
  const theme = useTheme();
  const [totalCategory, setTotalCategory] = useState<string[]>(TOTAL_TAG);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    route.params?.selectedCategory ?? undefined,
  );

  const handleSelectTag = (tag: string) =>
    setSelectedCategory(selectedCategory === tag ? undefined : tag);
  const handleCreateCategory = () => {
    setSelectedCategory(undefined);
    navigation.navigate('CategoryCreate', { customCategory });
  };
  const isActive = selectedCategory !== undefined;

  return (
    <>
      <View style={{ margin: 10 }}>
        <Text style={theme.fonts.text.display}>챌린지 카테고리를</Text>
        <Text style={theme.fonts.text.display}>1개 선택하세요</Text>
      </View>
      <Stepper totalStep={3} currentStep={1}></Stepper>
      <ChallengeCategorySelectSection
        totalCategory={[...customCategory, ...totalCategory]}
        selectedCategory={selectedCategory}
        onSelect={handleSelectTag}
        onCreateCategory={handleCreateCategory}
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
