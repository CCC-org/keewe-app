import React, { useEffect, useState } from 'react';
import { useTheme } from 'react-native-paper';
import TextInputDetail from '../../components/texts/TextInputDetail';
import HeaderRightButton from '../../components/header/HeaderRightButton';

const CategoryCreateScreen = ({ navigation, route }) => {
  const [customCategory, setCustomCategory] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const theme = useTheme();
  const [input, setInput] = useState<string>('');

  const handleComplete = () => {
    navigation.navigate('CategorySelect', {
      selectedCategory: input,
      customCategory: [input, ...customCategory],
    });
  };
  useEffect(() => {
    if (input.length > 8) {
      setErrorMessage('8자 이내로 입력하세요.');
    } else if (input.includes(' ')) {
      setErrorMessage('띄어쓰기는 입력할 수 없어요.');
    } else if (!/^[a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/.test(input))
      setErrorMessage('한글, 영문만 입력할 수 있어요.');
    else setErrorMessage('');
  }, [input]);

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
        inputValue={input}
        label=""
        placeholder="관심사를 입력하세요"
        letterLimit={25}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default CategoryCreateScreen;
