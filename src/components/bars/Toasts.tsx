import { Pressable, Text, View } from 'react-native';
import React from 'react';
import Toast from 'react-native-toast-message';
import theme from '../../theme/light';
import { SvgXml } from 'react-native-svg';
import copyLinkXml from '../../../assets/svgs/copyLinkXml';

const toastConfig = {
  snackbar: (props) => (
    <View
      style={{
        backgroundColor: 'white',
      }}
    >
      <View
        style={{
          width: 343,
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 8,
          backgroundColor: `${theme.colors.graphic.black}cc`,
          alignContent: 'center',
          opacity: 1,
        }}
      >
        <Text
          style={{
            ...theme.fonts.text.body2.regular,
            marginVertical: 12,
            color: theme.colors.graphic.white,
          }}
        >
          {props.text1}
        </Text>
      </View>
    </View>
  ),
  copySnackbar: (props) => (
    <View
      style={{
        backgroundColor: 'white',
      }}
    >
      <View
        style={{
          width: 343,
          marginHorizontal: 16,
          borderRadius: 8,
          backgroundColor: `${theme.colors.graphic.black}cc`,
          alignContent: 'center',
        }}
      >
        <View
          style={{
            marginHorizontal: 16,
            marginVertical: 8,
            flexDirection: 'row',
            margin: 'auto',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
            }}
          >
            <SvgXml xml={copyLinkXml} />
            <Text
              style={{
                ...theme.fonts.text.body2.regular,
                color: theme.colors.graphic.white,
                marginLeft: 8,
                alignSelf: 'center',
              }}
            >
              {props.text1}
            </Text>
          </View>
          <Pressable
            onPress={props.onPress}
            style={{ alignContent: 'center', paddingHorizontal: 8, paddingVertical: 11 }}
          >
            <Text
              style={{
                ...theme.fonts.text.body2.regular,
                fontFamily: 'pretendardSemiBold',
                fontSize: 16,
                color: theme.colors.brand.primary.main,
              }}
            >
              {props.text2}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  ),
};

const Toasts = () => {
  return <Toast config={toastConfig} />;
};

export default Toasts;
