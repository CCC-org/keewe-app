import { View } from 'react-native';
import React from 'react';
import CountingTextArea from '../../components/texts/CountingTextArea';
import TextInputDetail from '../../components/texts/TextInputDetail';

interface ChallengeInfoSectionProps {
  challengeName: string;
  setChallengeName: (value: string) => void;
  challengeInfo: string;
  setChallengeInfo: (value: string) => void;
}

const ChallengeInfoSection = ({
  challengeName,
  setChallengeName,
  challengeInfo,
  setChallengeInfo,
}: ChallengeInfoSectionProps) => {
  return (
    <>
      <View style={{ marginBottom: 20 }}>
        <TextInputDetail
          setInputValue={setChallengeName}
          infoText="챌린지 이름"
          inputValue={challengeName}
          label=""
          placeholder="ex. 꾸준히 마케팅 인사이트 적기"
          letterLimit={25}
        />
      </View>
      <CountingTextArea
        placeholder="간단한 챌린지 소개와 함께 사람들과 하고 싶은 챌린지에 대해 설명해주세요."
        inputValue={challengeInfo}
        setInputValue={setChallengeInfo}
        infoText="챌린지 소개(선택)"
      />
    </>
  );
};

export default ChallengeInfoSection;
