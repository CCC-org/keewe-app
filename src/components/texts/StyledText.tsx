import React, { useMemo } from 'react';
import { Text } from 'react-native';
import { TextProps, StyleProp, TextStyle } from 'react-native';

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}

interface customTextProps extends TextProps {
  style?: StyleProp<TextStyle> | any;
}

export function FontText(props: customTextProps) {
  let fontWeight = '';
  if (props.style && props.style.fontWeight) {
    fontWeight = props.style.fontWeight;
    delete props.style.fontWeight;
  }
  const getFontFamily = (weight: string) => {
    switch (weight) {
      case '400':
        return 'pretendard';
      case '500':
        return 'pretendardMedium';
      case '600':
        return 'pretendardSemiBold';
      case '700':
        return 'pretendardBold';
      case '800':
        return 'pretendardExtraBold';
      case '900':
        return 'pretendardBlack';
      default:
        return 'pretendard';
    }
  };

  const dynamicFontWeight = {
    fontFamily: useMemo(() => getFontFamily(fontWeight), [fontWeight]),
  };

  return (
    <Text {...props} style={[dynamicFontWeight, props.style]}>
      {props.children}
    </Text>
  );
}
