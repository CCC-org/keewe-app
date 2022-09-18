import { StyleSheet, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import OnboardingIntroHeaderButton from '../../components/buttons/OnboardingIntroHeaderButton';
import HeaderText from '../../components/texts/HeaderText';
import Stepper from '../../components/stepper/Stepper';
import ConditionalButton from '../../components/buttons/ConditionalButton';

const ServiceIntroTwoScreen = ({ navigation }) => {
  const styles = createStyle();

  function handlePress() {
    navigation.navigate('ServiceIntroThree');
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/따봉도치.jpg')} style={styles.image} />
      <View style={styles.bottom}>
        <View style={styles.titleContainer}>
          {/* eslint-disable-next-line quotes */}
          <HeaderText header={`꾸준하기 어렵다면\n친구들과 함께 도전해요`} />
        </View>
        <View style={styles.nextButtonWithStepper}>
          <Stepper totalStep={3} currentStep={2} />
          <ConditionalButton
            isActive={true}
            text={'다음'}
            color="#e0f6a2"
            textColor="#486006"
            width={343}
            onPress={handlePress}
          />
        </View>
      </View>
    </View>
  );
};

export default ServiceIntroTwoScreen;

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
