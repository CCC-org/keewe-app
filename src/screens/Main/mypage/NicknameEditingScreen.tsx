import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import HeaderRightButton from '../../../components/header/HeaderRightButton';
import { useTheme } from 'react-native-paper';
import SmallTextInput from '../../../components/texts/SmallTextInput';

const NicknameEditingScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [title] = useState(route.params.title);
  const [introduction] = useState(route.params.introduction);
  const [selectedCategory] = useState(route.params.selectedCategory);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: '이름',
    });
  }, []);

  const handleComplete = () => {
    navigation.navigate(route.params?.toScreen, {
      nickname: input,
      title,
      selectedCategory,
      introduction,
    });
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton
          text="완료"
          backGroundColor={theme.colors.brand.primary.main}
          textColor={theme.colors.graphic.black}
          borderLine={false}
          disabled={false}
          handlePress={() => handleComplete()}
        />
      ),
    });
  }, [input, errorMessage]);

  useEffect(() => {
    setInput(route.params?.nickname ?? '');
  }, [route.params]);
  return (
    <View style={styles.container}>
      <SmallTextInput
        inputValue={input}
        setInputValue={setInput}
        placeholder="이름을 입력하세요."
        errorMessage={errorMessage}
      />
    </View>
  );
};

export default NicknameEditingScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 20,
  },
});
