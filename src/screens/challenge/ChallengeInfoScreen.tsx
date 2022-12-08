import React, { useState, useMemo, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import HeaderRightButton from '../../components/header/HeaderRightButton';
import ConditionalButton from '../../components/buttons/ConditionalButton';
import Stepper from '../../components/stepper/Stepper';
import ChallengeInfoSection from './ChallengeInfoSection';

const ChallengeInfoScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const [challengeName, setChallengeName] = useState<string>('');
  const [challengeInfo, setChallengeInfo] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const isActive = useMemo(
    () => challengeName !== '' && challengeInfo !== '',
    [challengeName, challengeInfo],
  );

  const hasError = useMemo(
    () => challengeName.length > 25 || challengeInfo.length > 150,
    [challengeName, challengeInfo],
  );

  const handleNextClick = () =>
    navigation.navigate('ChallengeGoalSetting', {
      form: { challengeName, challengeInfo, ...route.params.form },
    });

  useEffect(() => {
    if (challengeName.length > 25) {
      setErrorMessage('25자 이내로 입력하세요.');
    } else {
      setErrorMessage('');
    }
  }, [challengeName]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton
          text="다음"
          backGroundColor={
            isActive ? theme.colors.brand.primary.main : `${theme.colors.graphic.black}33`
          }
          textColor={isActive ? theme.colors.graphic.black : theme.colors.graphic.white}
          borderLine={false}
          disabled={!isActive || hasError}
          handlePress={() => handleNextClick()}
        />
      ),
    });
  }, [isActive, hasError]);

  return (
    <>
      <View style={styles.container}>
        <View style={{ marginHorizontal: 10 }}>
          <Text style={theme.fonts.text.display}>챌린지에 대해 알려주세요</Text>
        </View>
        <View style={{ marginHorizontal: 6 }}>
          <Stepper totalStep={3} currentStep={2} />
        </View>
        <ChallengeInfoSection
          challengeName={challengeName}
          setChallengeName={setChallengeName}
          challengeInfo={challengeInfo}
          setChallengeInfo={setChallengeInfo}
          errorMessage={errorMessage}
        />
        {/* <ConditionalButton
          isActive={isActive && !hasError}
          text={'다음'}
          color={'black'}
          width={150}
          onPress={handleNextClick}
        /> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default ChallengeInfoScreen;
