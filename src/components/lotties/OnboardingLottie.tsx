import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';

const OnboardingLottie = () => {
  return (
    <AnimatedLottieView
      source={require('../../../assets/lotties/onboardingLottie.json')}
      loop
      autoPlay={true}
      style={{
        width: 300,
        height: 240,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  );
};

export default OnboardingLottie;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
