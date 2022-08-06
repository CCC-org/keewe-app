import { StyleSheet, View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import TextInputDetail from '../../components/texts/TextInputDetail';
import BlackNextButton from '../../components/buttons/BlackNextButton';

const LinkCreationScreen = () => {
  const [link, setLink] = useState<string>('');
  const [isLengthGreaterThanFour, setIsLengthGreaterThanFour] = useState(false);

  useEffect(() => {
    if (link.length > 4) setIsLengthGreaterThanFour(true);
    else setIsLengthGreaterThanFour(false);
  }, [link]);

  function handleNextButtonPress() {
    alert('your link is ' + link);
  }

  return (
    <View style={styles.container}>
      <View style={styles.upper}>
        <View style={styles.text}>
          <Text style={styles.first}>링크를 만들어볼까요?</Text>
          <Text style={styles.second}>언제든지 링크를 바꿀 수 있어요.</Text>
        </View>
      </View>

      <View style={styles.bottom}>
        <View style={styles.input}>
          <TextInputDetail
            setInputValue={setLink}
            infoText=""
            inputValue={link}
            label="링크"
            placeholder="링크를 입력하세요"
          />
        </View>
      </View>
      <BlackNextButton isActive={isLengthGreaterThanFour} handlePress={handleNextButtonPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  upper: {
    flex: 1,
  },
  bottom: {
    backgroundColor: 'teal',
    flex: 5,
  },
  text: {
    marginHorizontal: 16,
  },
  first: {
    fontWeight: '600',
    fontSize: 30,
  },
  second: {
    fontWeight: '400',
    fontSize: 14,
    marginTop: 8,
  },
  input: {
    marginBottom: 20,
  },
});

export default LinkCreationScreen;
