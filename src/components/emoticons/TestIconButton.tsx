import React, { useState, useRef } from 'react';
import { Animated } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import FlyingEmoticons from './FlyingEmoticons';
import theme from '../../theme/light';

interface TestIconButtonProps {
  xml: string;
}

const TestIconButton = ({ xml }: TestIconButtonProps) => {
  const opacityValue = useRef(new Animated.Value(0)).current;
  const [clicked, setClicked] = useState<boolean>(false);
  const [animate, setAnimate] = useState<string[]>([]);

  const handleClick = () => {
    setClicked(!clicked);
    setAnimate((prev) => [...prev, `${xml}${animate.length}`]);
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 0,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 750,
        useNativeDriver: false,
      }).start();
    });
  };

  return (
    <>
      <Pressable onPress={handleClick}>
        <Animated.View
          style={{
            backgroundColor: opacityValue.interpolate({
              inputRange: [0, 1],
              outputRange: ['#00000000', '#1213140d'],
            }),
            padding: 10,
            ...styles.Button,
          }}
        >
          <SvgXml xml={xml} />
        </Animated.View>
        <View
          style={{
            width: 50,
            height: 100,
            position: 'absolute',
            bottom: 20,
            right: -7,
          }}
        >
          {animate.map((animateValue) => (
            <FlyingEmoticons key={animateValue} xml={xml} width={20} height={20} />
          ))}
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  Button: {
    borderRadius: 40,
  },
});

export default TestIconButton;
