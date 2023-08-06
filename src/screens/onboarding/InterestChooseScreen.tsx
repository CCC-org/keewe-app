import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import InterestChooseSection from './InterestChooseSection';
import { TOTAL_TAG } from '../../constants/Interests';
import { useMutation } from '@tanstack/react-query';
import HeaderText from '../../components/texts/HeaderText';
import Stepper from '../../components/stepper/Stepper';
import NumberProgressBar from '../../components/bars/NumberProgressBar';
import ConditionalButton from '../../components/buttons/ConditionalButton';
import { OnboardAPI, OnboardQueryKeys } from '../../utils/api/OnboardAPI';
import { useTheme } from 'react-native-paper';

const InterestChooseScreen = ({ navigation, route }) => {
  const totalCategory = TOTAL_TAG;
  const theme = useTheme();
  const [customCategory, setCustomCategory] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [conditionalText, setConditionalText] = useState<string>('관심사를 선택하세요');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nicknameState, _] = useState<string>(route.params.nickname);

  const { mutate: makeProfile } = useMutation(
    OnboardQueryKeys.makeProfile({
      nickname: nicknameState,
      interests: selectedCategory,
    }),
    () =>
      OnboardAPI.makeProfile({
        nickname: nicknameState,
        interests: selectedCategory,
      }),
  );

  const handleSelectTag = (tag: string) => {
    if (!selectedCategory.includes(tag)) {
      setSelectedCategory([...selectedCategory, tag]);
    } else {
      const newArr = selectedCategory.filter((e) => e !== tag);
      setSelectedCategory(newArr);
    }
  };

  const handleCreateCategory = () =>
    navigation.navigate('CategoryCreate', { toScreen: 'InterestChoose' });

  const handleNextScreen = () => {
    //create ID
    makeProfile();
    navigation.navigate('InsightSample', { category: selectedCategory });
  };

  useEffect(() => {
    if (selectedCategory.length < 1) setConditionalText('관심사를 선택하세요');
    else if (selectedCategory.length > 5) setConditionalText('5개 이하로 선택하세요');
    else setConditionalText('완료');
  }, [selectedCategory]);

  useEffect(() => {
    // eslint-disable-next-line no-prototype-builtins
    if (!route.params.hasOwnProperty('customCategory')) return;
    const { customCategory: paramCustomArr } = route.params;
    if (customCategory) {
      setCustomCategory([...paramCustomArr, ...customCategory]);
      setSelectedCategory([...paramCustomArr, ...selectedCategory]);
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
        <HeaderText header={'관심사를 알려주세요'} />
        <Text
          style={{
            ...theme.fonts.text.footnote,
            color: `${theme.colors.graphic.black}99`,
            marginTop: 8,
            marginLeft: 1,
          }}
        >
          최대 5개까지 추가할 수 있어요
        </Text>
        <Stepper currentStep={2} totalStep={2} />
      </View>
      <View style={{ marginTop: 20 }}>
        <InterestChooseSection
          totalCategory={totalCategory}
          customCategory={customCategory}
          selectedCategory={selectedCategory}
          onSelect={handleSelectTag}
          onCreateCategory={handleCreateCategory}
        />
      </View>
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

export default InterestChooseScreen;
