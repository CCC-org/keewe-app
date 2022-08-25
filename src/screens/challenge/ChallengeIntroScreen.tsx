import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import TextInputDetail from '../../components/texts/TextInputDetail';
import ChallengeIntroduction from '../../components/texts/ChallengeIntroduction';

const ChallengeIntroScreen = () => {
  const [challengeName, setChallengeName] = useState<string>('');
  const [challengeIntro, setChallengeIntro] = useState<string>('');

  return (
    <View style={styles.container}>
      <View style={styles.upper}></View>

      <View style={styles.bottom}>
        <View style={styles.input}>
          <TextInputDetail
            setInputValue={setChallengeName}
            infoText="챌린지 이름"
            inputValue={challengeName}
            label=""
            placeholder="ex. 꾸준히 마케팅 인사이트 적기"
            letterLimit={25}
          />
        </View>
        <ChallengeIntroduction
          placeholder="간단한 챌린지 소개와 함께 사람들과 하고 싶은 챌린지에 대해 설명해주세요."
          inputValue={challengeIntro}
          setInputValue={setChallengeIntro}
          infoText="챌린지 소개(선택)"
        />
      </View>
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
    backgroundColor: 'ivory',
    flex: 5,
  },
  input: {
    marginBottom: 20,
  },
});

export default ChallengeIntroScreen;
