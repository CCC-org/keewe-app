import { StyleSheet, View, Text } from 'react-native';
import React, { useCallback, useRef } from 'react';
import SocialLoginButton from '../../components/buttons/SocialLoginButton';
import { useTheme } from 'react-native-paper';
import OnboardingLottie from '../../components/lotties/OnboardingLottie';
import kakao from '../../constants/Icons/Signin/kakao';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import apple from '../../constants/Icons/Signin/apple';
import google from '../../constants/Icons/Signin/google';
import naver from '../../constants/Icons/Signin/naver';

const SignUpScreen = ({ navigation }) => {
  const modalRef = useRef<BottomSheetModal>(null);
  const theme = useTheme();
  const handleLoginPress = (oauth: string) => {
    navigation.navigate('Login', { oauth });
    modalRef.current?.close();
  };

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    [],
  );

  const handleOtherPress = () => {
    modalRef.current?.present();
  };

  return (
    <View style={styles.container}>
      <View
        style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '62%' }}
      >
        <OnboardingLottie />
      </View>
      <View style={styles.login}>
        <Text style={styles.agree}>
          <Text style={styles.greeny}>Keewe 약관</Text>에 모두 동의합니다.
        </Text>
        <View style={styles.kakao}>
          <SocialLoginButton
            text="카카오로 시작하기"
            textColor={theme.colors.graphic.black}
            xml={kakao}
            color={theme.colors.graphic.yellow}
            onPress={() => handleLoginPress('kakao')}
          />
        </View>
        <View style={styles.other}>
          <SocialLoginButton
            text="다른 방법으로 시작하기"
            textColor={theme.colors.graphic.black}
            color="#E1E1D0"
            onPress={handleOtherPress}
          />
        </View>
      </View>
      <BottomSheetModal ref={modalRef} snapPoints={['40%']} backdropComponent={renderBackdrop}>
        <Text
          style={{
            fontFamily: 'pretendardSemiBold',
            fontSize: 22,
            marginHorizontal: 16,
            marginVertical: 24,
          }}
        >
          다른 방법으로 시작하기
        </Text>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View style={styles.kakao}>
            <SocialLoginButton
              text="Apple로 로그인"
              textColor={theme.colors.graphic.white}
              xml={apple}
              color={theme.colors.graphic.black}
              onPress={() => handleLoginPress('apple')}
            />
          </View>
          <View style={styles.other}>
            <SocialLoginButton
              text="Google 계정으로 시작하기"
              textColor={`${theme.colors.graphic.black}54`}
              xml={google}
              color="#EEEEEE"
              onPress={() => handleLoginPress('google')}
            />
          </View>
          <View style={styles.other}>
            <SocialLoginButton
              text="네이버로 시작하기"
              textColor={theme.colors.graphic.white}
              xml={naver}
              color={'#03C75A'}
              onPress={() => handleLoginPress('naver')}
            />
          </View>
        </View>
      </BottomSheetModal>
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
