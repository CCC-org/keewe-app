import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { BaseToast, ErrorToast } from 'react-native-toast-message';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import theme from '../../theme/light';
const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderRadius: 8 }}
      contentContainerStyle={{
        backgroundColor: '#121314',
        borderRadius: 8,
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
        color: 'white',
        fontFamily: 'pretendard',
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  snackbar: ({ text1, props }) => (
    <>
      <View
        style={{
          width: 343,
          height: 60,
          borderRadius: 8,
          paddingHorizontal: 10,
          marginLeft: 'auto',
          marginRight: 'auto',
          backgroundColor: `${theme.colors.graphic.black}cc`,
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ marginLeft: 15, fontFamily: 'pretendard', fontSize: 14, color: '#FFFFFF' }}>
          {text1}
        </Text>
      </View>
    </>
  ),

  styles: {
    container: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      zIndex: 9999,
      elevation: 9999,
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    text: {
      fontSize: 16,
      color: 'white',
      fontWeight: 'bold',
    },
    text1: {
      fontSize: 16,
      color: 'white',
      fontWeight: 'bold',
    },
  },
};

const Toasts = () => {
  return <Toast config={toastConfig} />;
};

export default Toasts;

const styles = StyleSheet.create({});
