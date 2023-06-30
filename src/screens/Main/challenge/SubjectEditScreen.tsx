import React, { useState, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import HeaderRightButton from '../../../components/header/HeaderRightButton';
import SmallTextInput from '../../../components/texts/SmallTextInput';
import theme from '../../../theme/light';

const SubjectEditScreen = ({ navigation, route }) => {
  const { currentSubject, setSubject } = route.params;
  const [input, setInput] = useState<string>(currentSubject ?? '');

  const handleComplete = () => {
    setSubject(input);
    navigation.goBack();
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
          handlePress={handleComplete}
        />
      ),
    });
  }, [input, currentSubject, setSubject]);

  return (
    <View style={styles.container}>
      <SmallTextInput
        inputValue={input}
        setInputValue={setInput}
        placeholder={'나의 주제를 추가해주세요'}
        errorMessage={''}
      />
    </View>
  );
};

export default SubjectEditScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 17,
    paddingTop: 20,
  },
});
