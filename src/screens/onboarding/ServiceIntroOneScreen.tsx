import { StyleSheet, View, Image, Dimensions, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import OnboardingIntroHeaderButton from '../../components/buttons/OnboardingIntroHeaderButton';
import HeaderText from '../../components/texts/HeaderText';
import Stepper from '../../components/stepper/Stepper';
import ConditionalButton from '../../components/buttons/ConditionalButton';

const fullScreenHeight = Dimensions.get('window').height;

const ServiceIntroOneScreen = ({ navigation, route }) => {
  const styles = createStyle();

  function handlePress() {
    navigation.navigate('ServiceIntroTwo');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../../../assets/images/따봉도치.jpg')} style={styles.image} />
      <View style={styles.bottom}>
        <View style={styles.titleContainer}>
          {/* eslint-disable-next-line quotes */}
          <HeaderText header={`기억하고 싶은 콘텐츠, \n지나치지 말고 기록하세요`} />
        </View>
        <View style={styles.nextButtonWithStepper}>
          <Stepper totalStep={3} currentStep={1} />
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
    </ScrollView>
  );
};

export default ServiceIntroOneScreen;

export function createStyle() {
  return StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },

    image: {
      borderColor: 'red',
      width: '100%',
      height: fullScreenHeight * 0.62,
    },
    titleContainer: {
      minWidth: '92%',
    },
    bottom: {
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingTop: 30,
      paddingBottom: 0,
      height: fullScreenHeight * 0.38,
    },

    nextButtonWithStepper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
}
