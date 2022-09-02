import React, { useEffect, useState } from 'react';
import { useTheme } from 'react-native-paper';
import TextInputDetail from '../../components/texts/TextInputDetail';
import HeaderRightButton from '../../components/header/HeaderRightButton';

const CategoryCreateScreen = ({ navigation, route }) => {
  const [customCategory, setCustomCategory] = useState<string[]>([]);

  const theme = useTheme();
  const [input, setInput] = useState<string>('');

  const handleComplete = () => {
    navigation.navigate('CategorySelect', {
      selectedCategory: input,
      customCategory: [input, ...customCategory],
    });
  };

  useEffect(() => {
    setCustomCategory(route.params?.customCategory ?? []);
  }, [route.params]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton
          text="완료"
          backGroundColor={
            input !== '' ? theme.colors.brand.primary.main : `${theme.colors.graphic.black}10`
          }
          textColor={input !== '' ? theme.colors.graphic.black : theme.colors.graphic.white}
          borderLine={false}
          disabled={input !== '' ? false : true}
          handlePress={() => handleComplete()}
        />
      ),
    });
  }, [navigation, input]);

  return (
    <>
      <TextInputDetail
        setInputValue={setInput}
        infoText="관심사"
        inputValue={input}
        label=""
        placeholder="관심사를 입력하세요"
        letterLimit={25}
      />
    </>
  );
};

export default CategoryCreateScreen;
