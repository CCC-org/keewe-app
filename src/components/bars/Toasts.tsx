import { Text, View } from 'react-native';
import React from 'react';
import Toast from 'react-native-toast-message';
import theme from '../../theme/light';

const toastConfig = {
  snackbar: (props) => (
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
        {props.text1}
      </Text>
    </View>
  ),
};

const Toasts = () => {
  return <Toast config={toastConfig} />;
};

export default Toasts;
