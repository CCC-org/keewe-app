import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInputDetail from '../../components/texts/TextInputDetail';
import BlackNextButton from '../../components/buttons/BlackNextButton';
import HeaderRightButton from '../../components/header/HeaderRightButton';

const detailInfoTextProp = `반가워요 키위새님${'\n'}닉네임이 무엇인가요?`;

const NicknameCreationScreen = ({ navigation }) => {
  const [nickname, setNickname] = useState<string>('');
  const [isLengthGreaterThanFour, setIsLengthGreaterThanFour] = useState(false);

  //여기서 부터 HeaderRightButton 사용 예제입니다.
  const [isHeaderButtonOn, setIsHeaderButtonOn] = useState(false);

  useEffect(() => {
    if (nickname.length > 4) setIsHeaderButtonOn(true);
    else setIsHeaderButtonOn(false);
  }, [nickname]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton
          text="Done"
          backGroundColor={isHeaderButtonOn ? '#B0E817' : 'lightgrey'}
          textColor={isHeaderButtonOn ? 'black' : 'white'}
          borderLine={false}
          disabled={isHeaderButtonOn ? false : true}
          handlePress={() => navigation.goBack()}
        />
      ),
    });
  }, [navigation, nickname]);
  //HeaderRightButton 사용 예제 끝입니다.

  useEffect(() => {
    if (nickname.length > 4) setIsLengthGreaterThanFour(true);
    else setIsLengthGreaterThanFour(false);
  }, [nickname]);

  function handleNextButtonPress() {
    alert('다음으로 가기 검은색버튼 눌림. 닉네임: ' + nickname);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ backgroundColor: 'orange' }}>
        <TextInputDetail
          setInputValue={setNickname}
          infoText={detailInfoTextProp}
          inputValue={nickname}
          label="닉네임"
          placeholder="닉네임을 입력하세요"
          letterLimit={20}
        />
      </View>
      <BlackNextButton isActive={isLengthGreaterThanFour} handlePress={handleNextButtonPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
  },
});

export default NicknameCreationScreen;
