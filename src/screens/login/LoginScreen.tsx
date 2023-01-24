import React from 'react';
import { WebView } from 'react-native-webview';
import { View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { LoginQueryKeys, LoginAPI } from '../../utils/api/LoginAPI';
import { setAccessToken, setUserId } from '../../utils/hooks/asyncStorage/Login';

// eslint-disable-next-line quotes
const INJECTED_JAVASCRIPT = "window.ReactNativeWebView.postMessage('login start')";

function Login({ navigation, route }) {
  const params: LoginRequest = {
    oauth: route.params.oauth,
    code: undefined,
    state: undefined,
  };

  const { refetch } = useQuery(LoginQueryKeys.login(params), () => LoginAPI.login(params), {
    onSuccess: (response) => {
      setAccessToken(response.data.accessToken);
      setUserId(response.data.userId);
      navigation.navigate('CategorySelect');
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
      refetch();
    }
  }

  return (
    <View style={{ flex: 1 }}>
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
    </View>
  );
}

export default Login;
