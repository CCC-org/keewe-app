import React from 'react';
import { WebView } from 'react-native-webview';
import { View } from 'react-native';

// eslint-disable-next-line quotes
const INJECTED_JAVASCRIPT = "window.ReactNativeWebView.postMessage('message from webView')";

function KakaoLogin({ navigation }) {
  function getCode(target: string) {
    const exp = 'code=';
    const condition = target.indexOf(exp);
    if (condition !== -1) {
      const requestCode = target.substring(condition + exp.length);
      navigation.navigate('GetToken', { token: requestCode });
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        source={{
          uri: 'https://api-keewe.com/api/v1/oauth/kakao',
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

export default KakaoLogin;
