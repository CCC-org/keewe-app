import { StyleSheet, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import OnboardingIntroHeaderButton from '../../components/buttons/OnboardingIntroHeaderButton';
import HeaderText from '../../components/texts/HeaderText';
import Stepper from '../../components/stepper/Stepper';
import ConditionalButton from '../../components/buttons/ConditionalButton';

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
            text={'다음'}
            color="#b0e817"
            textColor="black"
            width={343}
            onPress={handlePress}
          />
        </View>
      </View>
    </View>
  );
};

export default ServiceIntroThreeScreen;

function createStyle() {
  return StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },

    image: {
      height: 448,
    },
    titleContainer: {
      minWidth: '92%',
    },
    bottom: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 40,
      paddingHorizontal: 10,
      height: 280,
    },

    nextButtonWithStepper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
}
