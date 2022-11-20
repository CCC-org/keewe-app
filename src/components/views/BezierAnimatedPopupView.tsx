import React, { useRef } from 'react';
import { Animated, Easing } from 'react-native';

interface BezierAnimatedPopupViewProps {
  children: JSX.Element;
  startMargin: number;
  endMargin: number;
  duration: number;
  bezier: number[];
}

const BezierAnimatedPopupView = ({
  children,
  startMargin,
  endMargin,
  duration,
  bezier,
}: BezierAnimatedPopupViewProps) => {
  const marginValue = useRef(new Animated.Value(startMargin)).current;

  Animated.timing(marginValue, {
    toValue: endMargin,
    duration: duration,
    easing: Easing.bezier(bezier[0], bezier[1], bezier[2], bezier[3]),
    useNativeDriver: false,
  }).start();

  return (
    <>
      <Animated.View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: marginValue,
        }}
      >
        {children}
      </Animated.View>
    </>
  );
};

export default BezierAnimatedPopupView;
