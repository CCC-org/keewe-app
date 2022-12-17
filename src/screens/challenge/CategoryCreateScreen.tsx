import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTheme } from 'react-native-paper';
import HeaderRightButton from '../../components/header/HeaderRightButton';
import SmallTextInput from '../../components/texts/SmallTextInput';
import { StyleSheet, View, Text } from 'react-native';

const CategoryCreateScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const [customCategory, setCustomCategory] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [input, setInput] = useState<string>('');

  const handleComplete = () => {
    navigation.navigate(route.params?.toScreen, {
      selectedCategory: [input],
      customCategory: [input, ...customCategory],
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '직접 추가',
    });
  }, []);

  useEffect(() => {
    if (input.length > 8) {
      setErrorMessage('8자 이내로 입력하세요.');
    } else if (input.includes(' ')) {
      setErrorMessage('띄어쓰기는 입력할 수 없어요.');
    } else if (!/^[a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/.test(input) && input !== '')
      setErrorMessage('한글, 영문만 입력할 수 있어요.');
    else setErrorMessage('');
  }, [input]);

  useEffect(() => {
    setCustomCategory(route.params?.customCategory ?? []);
  }, [route.params]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton
          text="완료"
          backGroundColor={
            errorMessage.length === 0 && input.length > 0
              ? theme.colors.brand.primary.main
              : `${theme.colors.graphic.black}33`
          }
          textColor={
            errorMessage.length === 0 && input.length > 0
              ? theme.colors.graphic.black
              : theme.colors.graphic.white
          }
          borderLine={false}
          disabled={errorMessage.length !== 0 || input.length === 0}
          handlePress={() => handleComplete()}
        />
      ),
    });
  }, [input, errorMessage]);

  return (
    <View style={styles.container}>
      <SmallTextInput
        inputValue={input}
        setInputValue={setInput}
        placeholder={'관심사를 입력하세요'}
        errorMessage={errorMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 20,
  },
});

export default CategoryCreateScreen;
