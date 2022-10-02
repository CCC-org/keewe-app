import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

interface FlyingEmoticonsProps {
  xml: string;
}

const FlyingEmoticons = ({ xml }: FlyingEmoticonsProps) => {
  const [animation, setAnimation] = useState<boolean>(true);
  const marginValue = useRef(new Animated.Value(100)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;
  const danglingValue = useRef(new Animated.Value(15)).current;

  if (animation) {
    Animated.timing(opacityValue, { toValue: 1, duration: 500, useNativeDriver: false }).start(
      () => {
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }).start();
      },
    );

    Animated.timing(danglingValue, {
      toValue: Math.floor(Math.random() * 30),
      duration: 1200,
      easing: Easing.bezier(
        Math.floor(Math.random() * 10) / 10,
        Math.floor(Math.random() * 10) / 10 + 0.7,
        Math.floor(Math.random() * 10) / 10,
        Math.floor(Math.random() * 10) / 10 + 0.7,
      ),
      useNativeDriver: false,
    }).start();

    Animated.timing(marginValue, {
      toValue: 35,
      duration: 1200,
      easing: Easing.bezier(0.5, 1.0, 0.5, 1.0),
      useNativeDriver: false,
    }).start();

    setAnimation(false);
  }

  return (
    <>
      <Animated.View
        style={{ ...styles.emotion, top: marginValue, left: danglingValue, opacity: opacityValue }}
      >
        <SvgXml xml={xml} height={20} width={20} />
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  emotion: {
    left: 15,
    position: 'absolute',
  },
});

export default FlyingEmoticons;
