import { StyleSheet, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import OnboardingIntroHeaderButton from '../../components/buttons/OnboardingIntroHeaderButton';
import HeaderText from '../../components/texts/HeaderText';
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
      <View style={styles.bottom}>
        <HeaderText header="기억하고 싶은 콘텐츠, 지나치지 말고 기록하세요" />
      </View>
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

  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
  },
});
