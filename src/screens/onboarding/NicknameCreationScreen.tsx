import { View, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import TextInputDetail from '../../components/texts/TextInputDetail';
import HeaderRightButton from '../../components/header/HeaderRightButton';
import HeaderText from '../../components/texts/HeaderText';
import Stepper from '../../components/stepper/Stepper';

const NicknameCreationScreen = ({ navigation }) => {
  const [nickname, setNickname] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    if (nickname.length > 8) {
      setErrorMessage('8자 이내로 입력하세요.');
    } else if (nickname.includes(' ')) {
      setErrorMessage('띄어쓰기는 입력할 수 없어요.');
    } else if (!/^[a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/.test(nickname))
      setErrorMessage('한글, 영문만 입력할 수 있어요.');
    else setErrorMessage('');
  }, [nickname]);

  return (
    <View style={styles.container}>
      {/* eslint-disable-next-line quotes */}
      <HeaderText header={`반가워요 키위새님\n이름이 무엇인가요?`} />
      <Stepper currentStep={1} totalStep={2} />
      <TextInputDetail
        inputValue={nickname}
        setInputValue={setNickname}
        placeholder={'관심사를 입력해'}
        letterLimit={8}
        errorMessage={errorMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    // flexDirection: 'column',
    // alignItems: 'flex-start',
    // justifyContent: 'center',
  },
});

export default NicknameCreationScreen;
