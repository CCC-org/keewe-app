import { View } from 'react-native';
import React from 'react';
import CountingTextArea from '../../components/texts/CountingTextArea';
import TextInputDetail from '../../components/texts/TextInputDetail';

interface ChallengeInfoSectionProps {
  challengeName: string;
  setChallengeName: (value: string) => void;
  challengeInfo: string;
  setChallengeInfo: (value: string) => void;
  errorMessage: string;
}

const ChallengeInfoSection = ({
  challengeName,
  setChallengeName,
  challengeInfo,
  setChallengeInfo,
  errorMessage,
}: ChallengeInfoSectionProps) => {
  return (
    <>
      <View style={{ marginVertical: 30 }}>
        <TextInputDetail
          setInputValue={setChallengeName}
          infoText="챌린지 이름"
          inputValue={challengeName}
          placeholder="ex. 꾸준히 마케팅 인사이트 적기"
          letterLimit={25}
          errorMessage={errorMessage}
        />
      </View>
      <CountingTextArea
        placeholder="친구들과 함께하고 싶은 챌린지에 대해 소개해주세요."
        inputValue={challengeInfo}
        setInputValue={setChallengeInfo}
        infoText="챌린지 소개"
      />
    </>
  );
};

export default ChallengeInfoSection;
