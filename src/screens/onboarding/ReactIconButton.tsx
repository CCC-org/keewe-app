import React, { useState, useRef } from 'react';
import { Animated } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Pressable, Text, View, StyleSheet } from 'react-native';

interface ReactIconButtonProps {
  xml: string;
  backgroundColor: string;
  onClick: () => void;
}

const ReactIconButton = ({ xml, backgroundColor, onClick }: ReactIconButtonProps) => {
  const opacityValue = useRef(new Animated.Value(0)).current;

  const [clicked, setClicked] = useState<boolean>(false);

  const handleClick = () => {
    setClicked(!clicked);
    onClick();
    if (!clicked)
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    else
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
  };

  return (
    <>
      <Animated.View
        style={{
          backgroundColor: opacityValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['#00000000', backgroundColor],
          }),
          ...styles.Button,
        }}
      >
        <Pressable onPress={handleClick}>
          <SvgXml xml={xml} />
        </Pressable>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  Button: {
    padding: 5,
    borderRadius: 40,
  },
});

export default ReactIconButton;
