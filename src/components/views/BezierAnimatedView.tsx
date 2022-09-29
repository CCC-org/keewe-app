import React, { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Text } from 'react-native';

interface BezierAnimatedViewProps {
  children: JSX.Element;
  startMargin: number;
  endMargin: number;
  duration: number;
  bezier: number[];
}

const BezierAnimatedView = ({
  children,
  startMargin,
  endMargin,
  duration,
  bezier,
}: BezierAnimatedViewProps) => {
  const marginValue = useRef(new Animated.Value(startMargin)).current;

  Animated.timing(marginValue, {
    toValue: endMargin,
    duration: duration,
    easing: Easing.bezier(bezier[0], bezier[1], bezier[2], bezier[3]),
    useNativeDriver: false,
  }).start();

  return (
    <>
      <Animated.View style={{ marginTop: marginValue }}>{children}</Animated.View>
    </>
  );
};

export default BezierAnimatedView;
