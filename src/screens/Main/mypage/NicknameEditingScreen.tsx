import { StyleSheet, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import HeaderRightButton from '../../../components/header/HeaderRightButton';
import { useTheme } from 'react-native-paper';
import SmallTextInput from '../../../components/texts/SmallTextInput';

const NicknameEditingScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const [errorMessage] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [image] = useState(route?.params?.image);
  const [title] = useState(route?.params?.title);
  const [introduction] = useState(route?.params?.introduction);
  const [selectedCategory] = useState(route?.params?.selectedCategory);
  const [userId] = useState(route?.params?.userId);
  const [buttonOn, setButtonOn] = useState<boolean>(false);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: '이름',
    });
  }, []);

  const handleComplete = () => {
    navigation.navigate(route.params?.toScreen, {
      nickname: input,
      image,
      title,
      selectedCategory,
      introduction,
      userId,
    });
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton
          text="완료"
          backGroundColor={
            buttonOn ? theme.colors.brand.primary.main : `${theme.colors.graphic.black}33`
          }
          textColor={buttonOn ? theme.colors.graphic.black : theme.colors.graphic.white}
          borderLine={false}
          disabled={!buttonOn}
          handlePress={() => handleComplete()}
        />
      ),
    });
  }, [input, errorMessage, buttonOn]);

  useEffect(() => {
    setInput(route.params?.nickname ?? '');
  }, [route.params]);

  useEffect(() => {
    if (input.length === 0 || input.length > 12) setButtonOn(false);
    else if (route.params?.nickname === input) setButtonOn(false);
    else setButtonOn(true);
  }, [input]);

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
