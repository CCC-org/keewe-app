import { View } from 'react-native';
import React, { useState, useEffect } from 'react';
import TextInputDetail from '../../components/texts/TextInputDetail';
import HeaderRightButton from '../../components/header/HeaderRightButton';

const NicknameCreationScreen = ({ navigation }) => {
  const [nickname, setNickname] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isHeaderButtonOn, setIsHeaderButtonOn] = useState(false);
  useEffect(() => {
    if (nickname.length > 8) {
      setErrorMessage('8자 이내로 입력하세요.');
    } else if (nickname.includes(' ')) {
      setErrorMessage('띄어쓰기는 입력할 수 없어요.');
    } else if (!/^[a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/.test(nickname))
      setErrorMessage('한글, 영문만 입력할 수 있어요.');
    else setErrorMessage('');
  }, [nickname]);

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

  return (
    <View>
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

export default NicknameCreationScreen;
