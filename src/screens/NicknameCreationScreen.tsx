import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInputDetail from '../components/texts/TextInputDetail';
import BlackNextButton from '../components/buttons/BlackNextButton';
const detailInfoTextProp = `반가워요 키위새님${'\n'}닉네임이 무엇인가요?`;

const NicknameCreationScreen = () => {
  const [nickname, setNickname] = useState<string>('');
  const [isLengthGreaterThanFour, setIsLengthGreaterThanFour] = useState(false);

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
