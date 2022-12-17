import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import HeaderRightButton from '../../../components/header/HeaderRightButton';
import { useTheme } from 'react-native-paper';
import SmallTextInput from '../../../components/texts/SmallTextInput';

const NicknameEditingScreen = ({ navigation }) => {
  const theme = useTheme();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [input, setInput] = useState<string>('');
  useEffect(() => {
    navigation.setOptions({
      headerTitle: '이름',
    });
  }, []);
  const handleComplete = () => alert('변경 완료');
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton
          text="저장"
          backGroundColor={theme.colors.brand.primary.main}
          textColor={theme.colors.graphic.black}
          borderLine={false}
          disabled={false}
          handlePress={() => handleComplete()}
        />
      ),
    });
  }, []);
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
