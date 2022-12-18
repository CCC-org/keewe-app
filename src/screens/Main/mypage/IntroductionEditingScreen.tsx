import { StyleSheet, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import HeaderRightButton from '../../../components/header/HeaderRightButton';
import { useTheme } from 'react-native-paper';
import CountingTextArea from '../../../components/texts/CountingTextArea';

const IntroductionEditingScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const [input, setInput] = useState('');
  const [nickname] = useState(route.params.nickname);
  const [title] = useState(route.params.title);
  const [selectedCategory] = useState(route.params.selectedCategory);
  const handleComplete = () => {
    navigation.navigate(route.params?.toScreen, {
      nickname,
      title,
      selectedCategory,
      introduction: input,
    });
  };
  useEffect(() => {
    navigation.setOptions({
      headerTitle: '소개',
    });
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton
          text="완료"
          backGroundColor={
            input.length > 150 || input === route.params?.introduction
              ? `${theme.colors.graphic.black}33`
              : theme.colors.brand.primary.main
          }
          textColor={
            input.length > 150 || input === route.params?.introduction
              ? theme.colors.graphic.white
              : theme.colors.graphic.black
          }
          borderLine={false}
          disabled={input.length > 150 || input === route.params?.introduction ? true : false}
          handlePress={() => handleComplete()}
        />
      ),
    });
  }, [input]);
  useEffect(() => {
    setInput(route.params?.introduction ?? '');
  }, [route.params]);
  return (
    <View style={styles.container}>
      <CountingTextArea
        placeholder="자신을 자유롭게 표현해보세요."
        inputValue={input}
        setInputValue={setInput}
        height={214}
      />
    </View>
  );
};

export default IntroductionEditingScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
});
