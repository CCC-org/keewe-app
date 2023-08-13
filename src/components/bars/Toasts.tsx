import { Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import React from 'react';
import Toast from 'react-native-toast-message';
import theme from '../../theme/light';

const toastConfig = {
  snackbar: (props) => (
    <BlurView
      intensity={50} // Adjust the intensity of the blur effect
      tint="dark" // You can change this to 'light' or 'dark'
      style={{
        width: 343,
        height: 60,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 48,
        marginLeft: 'auto',
        marginRight: 'auto',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: `${theme.colors.graphic.black}cc`,
      }}
    >
      <Text
        style={{
          ...theme.fonts.text.body2.regular,
          marginLeft: 15,
          color: theme.colors.graphic.white,
        }}
      >
        {props.text1}
      </Text>
    </BlurView>
  ),
};

const Toasts = () => {
  return <Toast config={toastConfig} />;
};

export default Toasts;
