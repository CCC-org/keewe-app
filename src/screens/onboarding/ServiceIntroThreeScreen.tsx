import { StyleSheet, View, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import OnboardingIntroHeaderButton from '../../components/buttons/OnboardingIntroHeaderButton';
import HeaderText from '../../components/texts/HeaderText';
import Stepper from '../../components/stepper/Stepper';
import ConditionalButton from '../../components/buttons/ConditionalButton';
import { createStyle } from './ServiceIntroOneScreen';

const ServiceIntroThreeScreen = ({ navigation, route }) => {
  const styles = createStyle();

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerLeft: () => <View></View>,
      headerRight: () => <View></View>,
      headerStyle: {
        backgroundColor: 'transparent',
      },
    });
  });

  function handlePress() {
    alert('navigate to Home');
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={require('../../../assets/images/따봉도치.jpg')} style={styles.image} />
        <View style={styles.bottom}>
          <View style={styles.titleContainer}>
            {/* eslint-disable-next-line quotes */}
            <HeaderText header={`함께할수록 쉬워지는 기록\n키위가 도와줄게요!`} />
          </View>
          <View style={styles.nextButtonWithStepper}>
            <Stepper totalStep={3} currentStep={3} />
            <ConditionalButton
              isActive={true}
              text={'시작하기'}
              color="#b0e817"
              textColor="black"
              width={343}
              onPress={handlePress}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ServiceIntroThreeScreen;

createStyle();
