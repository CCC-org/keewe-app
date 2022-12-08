import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { TOTAL_TAG } from '../../constants/Interests';
import ChallengeCategorySelectSection from './ChallengeCategorySelectSection';
import ConditionalButton from '../../components/buttons/ConditionalButton';
import Stepper from '../../components/stepper/Stepper';

const CategorySelectScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const totalCategory = TOTAL_TAG;
  const [customCategory, setCustomCategory] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  const isActive = useMemo(() => selectedCategory !== undefined, [selectedCategory]);

  const handleSelectTag = (tag: string) =>
    setSelectedCategory(selectedCategory === tag ? undefined : tag);
  //  const handleCreateCategory = () => navigation.navigate('CategoryCreate', { customCategory });
  const handleCreateCategory = () =>
    navigation.navigate('CategoryCreate', { toScreen: 'CategorySelect' });

  const handleNextClick = () =>
    navigation.navigate('ChallengeInfo', { form: { selectedCategory } });

  useEffect(() => {
    setCustomCategory(route.params?.customCategory ?? '');
    setSelectedCategory(route.params?.selectedCategory ?? undefined);
  }, [route.params]);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <View style={{ marginHorizontal: 10 }}>
            <Text style={theme.fonts.text.display}>챌린지 카테고리를</Text>
            <Text style={theme.fonts.text.display}>1개 선택하세요</Text>
          </View>
          <View style={{ marginHorizontal: 6 }}>
            <Stepper totalStep={3} currentStep={1} />
          </View>
          <ChallengeCategorySelectSection
            totalCategory={[...customCategory, ...totalCategory]}
            selectedCategory={selectedCategory}
            onSelect={handleSelectTag}
            onCreateCategory={handleCreateCategory}
          />
        </View>
      </ScrollView>
      <View style={styles.btn}>
        <ConditionalButton
          isActive={isActive}
          text={isActive ? '다음' : '1개의 카테고리를 선택하세요'}
          color={'black'}
          width={350}
          onPress={handleNextClick}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  btn: {
    position: 'absolute',
    bottom: 18,
    left: 0,
    right: 0,
    margin: 'auto',
  },
});

export default CategorySelectScreen;
