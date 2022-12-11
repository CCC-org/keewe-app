import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';

const MainLottie = () => {
  return (
    <View style={styles.container}>
      <AnimatedLottieView
        source={require('../../../assets/lotties/mainLottie.json')}
        loop
        autoPlay={true}
        style={{ width: 150, height: 150 }}
      />
    </View>
  );
};

export default MainLottie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
