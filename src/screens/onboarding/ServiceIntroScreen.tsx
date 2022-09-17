import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import OnboardingIntroHeaderButton from '../../components/buttons/OnboardingIntroHeaderButton';
const ServiceIntroScreen = ({ navigation, route }) => {
  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerLeft: () => <View></View>,
      headerRight: () => <OnboardingIntroHeaderButton />,
      headerStyle: {
        backgroundColor: 'transparent',
      },
    });
  });
  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/따봉도치.jpg')} />
    </View>
  );
};

export default ServiceIntroScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
