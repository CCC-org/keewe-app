import React, { useState, useRef } from 'react';
import { Animated } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import FlyingEmoticons from './FlyingEmoticons';
import theme from '../../theme/light';

interface ReactIconButtonProps {
  xml: string;
  onClick: () => void;
}

const ReactIconButton = ({ xml, onClick }: ReactIconButtonProps) => {
  const opacityValue = useRef(new Animated.Value(0)).current;
  const paddingValue = useRef(new Animated.Value(0)).current;
  const marginValue = useRef(new Animated.Value(5)).current;
  const [clicked, setClicked] = useState<boolean>(false);
  const [animate, setAnimate] = useState<string[]>([]);

  const handleClick = () => {
    setClicked(!clicked);
    setAnimate((prev) => [...prev, `${xml}${animate.length}`]);
    onClick();
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 750,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start();
    });
    Animated.timing(paddingValue, { toValue: 5, duration: 600, useNativeDriver: false }).start(
      () => {
        Animated.timing(paddingValue, {
          toValue: 0,
          duration: 600,
          useNativeDriver: false,
        }).start();
      },
    );
    Animated.timing(marginValue, { toValue: 0, duration: 600, useNativeDriver: false }).start(
      () => {
        Animated.timing(marginValue, {
          toValue: 5,
          duration: 600,
          useNativeDriver: false,
        }).start();
      },
    );
  };

  return (
    <>
      <Animated.View
        style={{
          backgroundColor: opacityValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['#00000000', theme.colors.brand.surface.main],
          }),
          padding: 10,
          // margin: marginValue,
          ...styles.Button,
        }}
      >
        <Pressable onPress={handleClick}>
          <SvgXml xml={xml} />
        </Pressable>
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
          <FlyingEmoticons key={animateValue} xml={xml} />
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  Button: {
    borderRadius: 40,
  },
});

export default ReactIconButton;
