import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';

import SkipButton from '../../components/buttons/SkipButton';
import TextInputDetail from '../../components/texts/TextInputDetail';
import AddButton from '../../components/buttons/AddButton';
import BlackBelowButton from '../../components/buttons/BlackBelowButton';

const SocialLinkScreen = () => {
  const [link, setLink] = useState<string>('');
  const [isLengthGreaterThanFour, setIsLengthGreaterThanFour] = useState(false);

  useEffect(() => {
    if (link.length > 4) setIsLengthGreaterThanFour(true);
    else setIsLengthGreaterThanFour(false);
  }, [link]);

  const handleSkipPress = () => {
    alert('skip');
  };
  const handleAddPress = () => {
    alert('add link');
  };
  const handleCompletePress = () => {
    alert('complete');
  };
  return (
    <View style={styles.container}>
      <View style={styles.upper}>
        <View style={styles.skip}>
          <SkipButton onPress={handleSkipPress} text="다음에"></SkipButton>
        </View>
        <View style={styles.text}>
          <Text style={styles.first}>활동중인 SNS/웹사이트 </Text>
          <Text style={styles.second}>내 프로필에 최대 5개 링크를 추가할 수 있어요.</Text>
        </View>
      </View>

      <View style={styles.bottom}>
        <View style={styles.input}>
          <TextInputDetail
            setInputValue={setLink}
            infoText=""
            inputValue={link}
            label="링크1"
            placeholder="링크1"
          />
        </View>
        <View style={styles.add}>
          <AddButton onPress={handleAddPress} />
        </View>
        <BlackBelowButton
          isActive={isLengthGreaterThanFour}
          onPress={handleCompletePress}
          text="완료"
        ></BlackBelowButton>
      </View>
    </View>
  );
};

export default SocialLinkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  upper: {
    flex: 1,
  },
  bottom: {
    backgroundColor: 'teal',
    flex: 5,
  },
  skip: {
    alignItems: 'flex-end',
    margin: 10,
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
  add: {
    alignItems: 'center',
  },
});
