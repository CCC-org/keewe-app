import { StyleSheet, View, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import OnboardingIntroHeaderButton from '../../components/buttons/OnboardingIntroHeaderButton';
import HeaderText from '../../components/texts/HeaderText';
import Stepper from '../../components/stepper/Stepper';
import ConditionalButton from '../../components/buttons/ConditionalButton';
import { createStyle } from './ServiceIntroOneScreen';

const ServiceIntroTwoScreen = ({ navigation }) => {
  const styles = createStyle();

  function handlePress() {
    navigation.navigate('ServiceIntroThree');
  }

  return (
    <ScrollView>
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
    </ScrollView>
  );
};

export default ServiceIntroTwoScreen;
