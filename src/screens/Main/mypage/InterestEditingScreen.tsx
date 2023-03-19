import { View } from 'react-native';
import React, { useState, useEffect } from 'react';
import InterestChooseSection from '../../onboarding/InterestChooseSection';
import { TOTAL_TAG } from '../../../constants/Interests';
import HeaderText from '../../../components/texts/HeaderText';
import NumberProgressBar from '../../../components/bars/NumberProgressBar';
import ConditionalButton from '../../../components/buttons/ConditionalButton';

const InterestEditingScreen = ({ navigation, route }) => {
  const totalCategory = TOTAL_TAG;
  const [customCategory, setCustomCategory] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [conditionalText, setConditionalText] = useState<string>('관심사를 선택하세요');
  const [title] = useState(route?.params?.title);
  const [introduction] = useState(route?.params?.introduction);
  const [nickname] = useState(route?.params?.nickname);
  const [image] = useState(route?.params?.image);
  const [userId] = useState(route?.params?.userId);
  const [btnActive, setBtnActive] = useState<boolean>(true);

  const handleSelectTag = (tag: string) => {
    if (!selectedCategory.includes(tag)) {
      setSelectedCategory([...selectedCategory, tag].sort());
    } else {
      const newArr = selectedCategory.filter((e) => e !== tag);
      setSelectedCategory(newArr.sort());
    }
  };

  const handleCreateCategory = () =>
    navigation.navigate('CategoryCreate', {
      toScreen: 'InterestEditing',
    });

  const handleNextScreen = () => {
    navigation.navigate('ProfileEdit', {
      nickname,
      image,
      title,
      selectedCategory,
      introduction,
      userId,
    });
  };

  useEffect(() => {
    if (selectedCategory.length < 1) setConditionalText('관심사를 선택하세요');
    else if (selectedCategory.length > 5) setConditionalText('5개 이하로 선택하세요');
    else setConditionalText('완료');
    JSON.stringify(selectedCategory.sort()) === JSON.stringify(route.params.selectedCategory.sort())
      ? setBtnActive(false)
      : setBtnActive(true);
  }, [selectedCategory]);

  useEffect(() => {
    // eslint-disable-next-line no-prototype-builtins
    if (!route.params.hasOwnProperty('customCategory')) return;
    const { customCategory: paramCustomArr, selectedCategory: paramSelectedArr } = route.params;
    if (customCategory) {
      setCustomCategory([...paramCustomArr, ...customCategory]);
      setSelectedCategory([...paramSelectedArr, ...selectedCategory].sort());
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
            isActive={
              selectedCategory.length > 0 && selectedCategory.length < 6 && btnActive === true
            }
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
