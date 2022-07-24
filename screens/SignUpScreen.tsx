import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import SocialLoginButton from '../components/SocialLoginButton';

const SignUpScreen = () => {
  const handleKakaoPress = () => {
    alert('카카오로 시작함.');
  };

  const handleOtherPress = () => {
    alert('started by other ways.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.rotty}></View>
      <View style={styles.login}>
        <Text style={styles.agree}>
          <Text style={styles.greeny}>Keewe 약관</Text>에 모두 동의합니다.
        </Text>
        <View style={styles.kakao}>
          <SocialLoginButton
            text="카카오로 시작하기"
            icon="facebook-messenger"
            color="#FEE500"
            onPress={handleKakaoPress}
          ></SocialLoginButton>
        </View>
        <View style={styles.other}>
          <SocialLoginButton
            text="다른 방법으로 시작하기"
            color="#E1E1D0"
            onPress={handleOtherPress}
          ></SocialLoginButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rotty: {
    flex: 62,
    backgroundColor: 'white',
  },
  login: {
    flex: 38,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  agree: {
    margin: 15,
  },
  kakao: {
    margin: 10,
  },
  other: {
    margin: 10,
  },
  greeny: {
    color: '#486006',
    fontWeight: '700',
  },
});

export default SignUpScreen;
