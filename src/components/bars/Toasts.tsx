import { Pressable, Text, View } from 'react-native';
import React from 'react';
import Toast from 'react-native-toast-message';
import theme from '../../theme/light';
import { BlurView } from 'expo-blur';
import isDarkMode from '../../utils/helper/display/isDarkMode';
import { Feather } from '@expo/vector-icons';
const toastConfig = {
  snackbar: (props) => (
    <View
      style={{
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      <BlurView
        intensity={16}
        style={{
          width: 343,
          paddingHorizontal: 16,
          paddingVertical: 8,
          backgroundColor: `${theme.colors.graphic.black}cc`,
          alignContent: 'center',
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
      </BlurView>
    </View>
  ),
  copySnackbar: (props) => (
    <View
      style={{
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: `${theme.colors.graphic.black}cc`,
      }}
    >
      <BlurView
        intensity={16}
        style={{
          width: 343,
          marginHorizontal: 16,
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
            <Feather name="link-2" size={24} color="white" />
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
      </BlurView>
    </View>
  ),
};

const Toasts = () => {
  return <Toast config={toastConfig} />;
};

export default Toasts;
