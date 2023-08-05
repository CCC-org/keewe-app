import { StyleSheet, View, Text, Platform } from 'react-native';
import React, { useCallback, useRef } from 'react';
import SocialLoginButton from '../../components/buttons/SocialLoginButton';
import { useTheme } from 'react-native-paper';
import OnboardingLottie from '../../components/lotties/OnboardingLottie';
import kakao from '../../constants/Icons/Signin/kakao';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import apple from '../../constants/Icons/Signin/apple';
import google from '../../constants/Icons/Signin/google';
import naver from '../../constants/Icons/Signin/naver';

const isIOS = Platform.OS === 'ios';

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
        {isIOS ? (
          <View style={styles.item}>
            <SocialLoginButton
              text="Apple로 로그인"
              textColor={theme.colors.graphic.white}
              xml={apple}
              color={theme.colors.graphic.black}
              onPress={() => handleLoginPress('apple')}
            />
          </View>
        ) : (
          <View style={styles.item}>
            <SocialLoginButton
              text="Google 계정으로 시작하기"
              textColor={`${theme.colors.graphic.black}8A`}
              xml={google}
              color="#EEEEEE"
              onPress={() => handleLoginPress('google')}
            />
          </View>
        )}
        <View style={styles.item}>
          <SocialLoginButton
            text="다른 방법으로 시작하기"
            textColor={theme.colors.graphic.black}
            color={theme.colors.brand.surface.container2}
            onPress={handleOtherPress}
          />
        </View>
      </View>
      <BottomSheetModal
        ref={modalRef}
        snapPoints={isIOS ? ['40%'] : ['30%']}
        backdropComponent={renderBackdrop}
      >
        <Text
          style={{
            ...theme.fonts.text.headline1,
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
          <View style={styles.item}>
            <SocialLoginButton
              text="카카오로 시작하기"
              textColor={theme.colors.graphic.black}
              xml={kakao}
              color={theme.colors.graphic.yellow}
              onPress={() => handleLoginPress('kakao')}
            />
          </View>
          <View style={styles.item}>
            <SocialLoginButton
              text="Google 계정으로 시작하기"
              textColor={`${theme.colors.graphic.black}8A`}
              xml={google}
              color="#EEEEEE"
              onPress={() => handleLoginPress('google')}
            />
          </View>
          <View style={styles.item}>
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
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  agree: {
    margin: 18,
  },
  item: {
    margin: 6,
  },
  greeny: {
    color: '#486006',
    fontWeight: '700',
  },
});

export default SignUpScreen;
