import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import HeaderRightButton from '../../../components/header/HeaderRightButton';
import { useTheme } from 'react-native-paper';
import CountingTextArea from '../../../components/texts/CountingTextArea';

const IntroductionEditingScreen = ({ navigation }) => {
  const theme = useTheme();
  const [input, setInput] = useState('');
  const handleComplete = () => alert('done');
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
            input.length < 151 ? theme.colors.brand.primary.main : `${theme.colors.graphic.black}33`
          }
          textColor={input.length < 151 ? theme.colors.graphic.black : theme.colors.graphic.white}
          borderLine={false}
          disabled={input.length < 151 ? false : true}
          handlePress={() => handleComplete()}
        />
      ),
    });
  }, [input]);
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
