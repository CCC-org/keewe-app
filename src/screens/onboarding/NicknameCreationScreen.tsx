/* eslint-disable quotes */
import { View, StyleSheet, Pressable } from 'react-native';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import TextInputDetail from '../../components/texts/TextInputDetail';
import HeaderText from '../../components/texts/HeaderText';
import Stepper from '../../components/stepper/Stepper';
import ConditionalButton from '../../components/buttons/ConditionalButton';
import { SvgXml } from 'react-native-svg';
import { arrowLeft } from '../../constants/Icons/Navigation/ArrowLeftXml';

const NicknameCreationScreen = ({ navigation }) => {
  const [nickname, setNickname] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    if (nickname.length > 8) {
      setErrorMessage('8자 이내로 입력하세요.');
    } else if (nickname.includes(' ')) {
      setErrorMessage('띄어쓰기는 입력할 수 없어요.');
    }
    // 닉네임에 특수문자 가능??
    // else if (!/^[a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/.test(nickname))
    //   setErrorMessage('한글, 영문만 입력할 수 있어요.');
    else setErrorMessage('');
  }, [nickname]);

  function handleNextScreen() {
    navigation.navigate('InterestChoose', { nickname });
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          style={{ marginLeft: 18 }}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'SignUp' }],
            })
          }
        >
          <SvgXml xml={arrowLeft} />
        </Pressable>
      ),
    });
  });

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <HeaderText header={`반가워요 키위새님\n이름이 무엇인가요?`} />
          <Stepper currentStep={1} totalStep={2} />
        </View>

        <View style={{ marginHorizontal: 3 }}>
          <TextInputDetail
            inputValue={nickname}
            setInputValue={setNickname}
            placeholder={'이름을 자유롭게 정하세요'}
            letterLimit={8}
            errorMessage={errorMessage}
          />
        </View>
      </View>
      <ConditionalButton
        isActive={!errorMessage.length && nickname.length > 0}
        onPress={handleNextScreen}
        text={'다음'}
        width={343}
        keyboardResponsive={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    height: 90,
    justifyContent: 'space-between',
    marginBottom: 20,
    marginHorizontal: 16,
  },
});

export default NicknameCreationScreen;
