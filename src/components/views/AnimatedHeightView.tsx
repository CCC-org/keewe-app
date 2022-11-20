import React, { useRef } from 'react';
import { Animated } from 'react-native';

interface AnimatedHeightViewProps {
  children: JSX.Element;
  startHeight: number;
  endHeight: number;
  duration: number;
}

const AnimatedHeightView = ({
  children,
  startHeight,
  endHeight,
  duration,
}: AnimatedHeightViewProps) => {
  const heightValue = useRef(new Animated.Value(startHeight)).current;

  Animated.timing(heightValue, {
    toValue: endHeight,
    duration: duration,
    useNativeDriver: false,
  }).start();

  return (
    <>
      <Animated.View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: heightValue,
          overflow: 'hidden',
        }}
      >
        {children}
      </Animated.View>
    </>
  );
};

export default AnimatedHeightView;
