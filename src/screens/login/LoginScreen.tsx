import React from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native';
import { useMutation, useQuery } from '@tanstack/react-query';
import { LoginQueryKeys, LoginAPI } from '../../utils/api/LoginAPI';
import * as Notifications from 'expo-notifications';
import { applicationId } from 'expo-application';
import { getExpoToken, setAccessToken, setUserId } from '../../utils/hooks/asyncStorage/Login';
// eslint-disable-next-line quotes
const INJECTED_JAVASCRIPT = "window.ReactNativeWebView.postMessage('login start')";

function Login({ navigation, route }) {
  const params: LoginRequest = {
    oauth: route.params.oauth,
    code: undefined,
    state: undefined,
  };
  const { mutate: tokenPush } = useMutation(LoginAPI.tokenPush, {
    onSuccess: async () => {
      alert('토큰 푸쉬 성공');
    },
    onError: (e) => {
      alert('토큰 push 실패');
    },
  });
  const { refetch } = useQuery(LoginQueryKeys.login(params), () => LoginAPI.login(params), {
    onSuccess: async (response) => {
      alert('try to login');
      setAccessToken(response?.data?.accessToken ?? '');
      setUserId(response?.data?.userId ?? 0);
      alert('getExpoToken');
      let token = await getExpoToken();
      if (token === null) {
        alert('if token === null');
        token = (
          await Notifications.getExpoPushTokenAsync({
            development: false,
            applicationId: applicationId || undefined,
          })
        ).data;
      }
      alert('token push');
      tokenPush({ pushToken: token ?? '' });
      if (response?.data.alreadySignedUp) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Tabs' }],
        });
        navigation.navigate('Feed');
      } else navigation.navigate('NicknameCreation');
    },
    onError: (e) => {
      alert('인증에 실패했습니다.');
      navigation.navigate('SignUp');
    },
    enabled: params.code !== undefined,
  });

  function getCode(target: string) {
    const codeExp = 'code=';
    const codeCondition = target.indexOf(codeExp);
    const stateExp = 'state=';
    const stateCondition = target.indexOf(stateExp);
    if (codeCondition !== -1) {
      const requestCode = target.substring(
        codeCondition + codeExp.length,
        stateCondition === -1 ? target.length : stateCondition - 1,
      );
      params.code = requestCode;
      if (stateCondition !== -1) {
        const requestState = target.substring(stateCondition + stateExp.length);
        params.state = requestState;
      }
      alert(target);
      refetch();
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        userAgent="Chrome"
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
        style={{ flex: 1 }}
        source={{
          uri: `https://api-keewe.com/api/v1/oauth/${route.params.oauth}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={(event) => {
          const data = event.nativeEvent.url;
          getCode(data);
        }}
      />
    </SafeAreaView>
  );
}

export default Login;
