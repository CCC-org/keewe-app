import React from 'react';
import { WebView } from 'react-native-webview';
import { View } from 'react-native';

// eslint-disable-next-line quotes
const INJECTED_JAVASCRIPT = "window.ReactNativeWebView.postMessage('login start')";

function Login({ navigation, route }) {
  function getCode(target: string) {
    const params: LoginRequest = {
      oauth: route.params.oauth,
      code: undefined,
      state: undefined,
    };
    const codeExp = 'code=';
    const codeCondition = target.indexOf(codeExp);
    const stateExp = 'state=';
    const stateCondition = target.indexOf(stateExp);
    if (codeCondition !== -1) {
      const requestCode = target.substring(codeCondition + codeExp.length);
      params.code = requestCode;
      if (stateCondition !== -1) {
        const requestState = target.substring(stateCondition + stateExp.length);
        params.state = requestState;
      }
      navigation.navigate('GetToken', { params });
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
