import { View } from 'react-native';
import React, { useState, useEffect } from 'react';
import InterestChooseSection from '../../onboarding/InterestChooseSection';
import { TOTAL_TAG } from '../../../constants/Interests';
import HeaderText from '../../../components/texts/HeaderText';
import Stepper from '../../../components/stepper/Stepper';
import NumberProgressBar from '../../../components/bars/NumberProgressBar';
import ConditionalButton from '../../../components/buttons/ConditionalButton';

const InterestEditingScreen = ({ navigation, route }) => {
  const totalCategory = TOTAL_TAG;
  const [customCategory, setCustomCategory] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [conditionalText, setConditionalText] = useState<string>('관심사를 선택하세요');
  const [title] = useState(route.params.title);
  const [introduction] = useState(route.params.introduction);
  const [nickname] = useState(route.params.nickname);

  const handleSelectTag = (tag: string) => {
    if (!selectedCategory.includes(tag)) {
      setSelectedCategory([...selectedCategory, tag]);
    } else {
      const newArr = selectedCategory.filter((e) => e !== tag);
      setSelectedCategory(newArr);
    }
  };

  const handleCreateCategory = () =>
    navigation.navigate('CategoryCreate', {
      toScreen: 'InterestEditing',
    });

  const handleNextScreen = () => {
    //create ID
    //makeProfile();
    navigation.navigate('ProfileEdit', {
      nickname,
      title,
      selectedCategory,
      introduction,
    });
  };

  useEffect(() => {
    if (selectedCategory.length < 1) setConditionalText('관심사를 선택하세요');
    else if (selectedCategory.length > 5) setConditionalText('5개 이하로 선택하세요');
    else setConditionalText('완료');
  }, [selectedCategory]);

  useEffect(() => {
    // eslint-disable-next-line no-prototype-builtins
    if (!route.params.hasOwnProperty('customCategory')) return;
    const { customCategory: paramCustomArr, selectedCategory: paramSelectedArr } = route.params;
    if (customCategory) {
      setCustomCategory([...paramCustomArr, ...customCategory]);
      setSelectedCategory([...paramSelectedArr, ...selectedCategory]);
    } else {
      setCustomCategory([]);
    }
  }, [route]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: 50,
          justifyContent: 'space-between',
          marginBottom: 20,
          marginTop: 10,
          paddingHorizontal: 16,
        }}
      >
        <HeaderText header={'관심사를 설정하세요'} />
        <Stepper currentStep={2} totalStep={2} />
      </View>
      <InterestChooseSection
        totalCategory={totalCategory}
        customCategory={customCategory}
        selectedCategory={selectedCategory}
        onSelect={handleSelectTag}
        onCreateCategory={handleCreateCategory}
      />
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <NumberProgressBar progressValue={selectedCategory.length} max={5} />
        <View style={{ marginBottom: 12, marginTop: 15 }}>
          <ConditionalButton
            isActive={selectedCategory.length > 0 && selectedCategory.length < 6}
            onPress={handleNextScreen}
            text={conditionalText}
            width={343}
          />
        </View>
      </View>
    </View>
  );
};

export default InterestEditingScreen;
