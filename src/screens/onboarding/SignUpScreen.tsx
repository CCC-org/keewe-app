import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import SocialLoginButton from '../../components/buttons/SocialLoginButton';
import { useTheme } from 'react-native-paper';
import OnboardingLottie from '../../components/lotties/OnboardingLottie';

const SignUpScreen = ({ navigation }) => {
  const theme = useTheme();
  const handleLoginPress = (oauth: string) => {
    navigation.navigate('Login', { oauth });
  };

  const handleOtherPress = () => {
    alert('started by other ways.');
  };

  return (
    <View style={styles.container}>
      <OnboardingLottie />
      <View style={styles.login}>
        <Text style={styles.agree}>
          <Text style={styles.greeny}>Keewe 약관</Text>에 모두 동의합니다.
        </Text>
        <View style={styles.kakao}>
          <SocialLoginButton
            text="카카오로 시작하기"
            icon="facebook-messenger"
            color={theme.colors.graphic.yellow}
            onPress={() => handleLoginPress('kakao')}
          ></SocialLoginButton>
        </View>
        <View style={styles.kakao}>
          <SocialLoginButton
            text="네이버로 시작하기"
            icon="facebook-messenger"
            color={theme.colors.graphic.green}
            onPress={() => handleLoginPress('naver')}
          ></SocialLoginButton>
        </View>
        <View style={styles.kakao}>
          <SocialLoginButton
            text="구글로 시작하기"
            icon="facebook-messenger"
            color={theme.colors.graphic.violet}
            onPress={() => handleLoginPress('google')}
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
    flexDirection: 'column',
    alignItems: 'center',
  },
  rotty: {
    flex: 62,
    backgroundColor: 'white',
  },
  login: {
    flex: 38,
    width: '100%',
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
