import React, { useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { SvgXml } from 'react-native-svg';

interface FlyingEmoticonsProps {
  xml: string;
}

const FlyingEmoticons = ({ xml }: FlyingEmoticonsProps) => {
  const marginValue = useRef(new Animated.Value(0)).current;

  Animated.timing(marginValue, {
    toValue: 10,
    duration: 1000,
    easing: Easing.bezier(0.5, 1.0, 0.5, 1.0),
    useNativeDriver: false,
  }).start();

  return (
    <>
      <Animated.View style={{ marginTop: marginValue }}>
        <SvgXml xml={xml} />
      </Animated.View>
    </>
  );
};

export default FlyingEmoticons;
