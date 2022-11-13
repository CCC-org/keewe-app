import React, { useState, useRef } from 'react';
import { Animated } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useMutation } from 'react-query';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import FlyingEmoticons from './FlyingEmoticons';
import { InsightAPI } from '../../utils/api/InsightAPI';
import theme from '../../theme/light';

interface ReactIconButtonProps {
  xml: string;
  color: string;
  taps?: number;
  name: string;
  insightId: number;
}

const ReactIconButton = ({ xml, color, taps, name, insightId }: ReactIconButtonProps) => {
  const opacityValue = useRef(new Animated.Value(0)).current;
  const [animate, setAnimate] = useState<string[]>([]);
  const [text, setText] = useState<number>(taps ?? 0);

  const { mutate: insightReact } = useMutation(InsightAPI.react, {
    onSuccess: (response) => {
      setText(response.data.count);
    },
  });

  const handleClick = () => {
    insightReact({ insightId, reactionType: name, value: 1 });
    // onClick();
    setAnimate((prev) => [...prev, `${xml}${animate.length}`]);
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 0,
      useNativeDriver: false,
    }).start();
    Animated.timing(opacityValue, {
      toValue: 0,
      duration: 750,
      useNativeDriver: false,
    }).start();
  };

  return (
    <>
      <Pressable onPress={handleClick}>
        <Animated.View
          style={{
            backgroundColor: opacityValue.interpolate({
              inputRange: [0, 1],
              outputRange: [theme.colors.graphic.white, color],
            }),
            padding: 8,
            borderColor: `${theme.colors.graphic.black}20`,
            borderWidth: 1,
            ...styles.Button,
          }}
        >
          <SvgXml xml={xml} />
          {text !== 0 && (
            <Animated.Text
              style={{
                color: opacityValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [theme.colors.graphic.black, theme.colors.graphic.white],
                }),
                ...theme.fonts.text.podkova.bold,
                marginLeft: 4,
              }}
            >
              <Text>{text}</Text>
            </Animated.Text>
          )}
        </Animated.View>
        <View
          style={{
            width: 50,
            height: 100,
            position: 'absolute',
            bottom: 20,
          }}
        >
          {animate.map((animateValue) => (
            <FlyingEmoticons key={animateValue} xml={xml} width={16} height={16} />
          ))}
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  Button: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 40,
    marginLeft: 8,
  },
});

export default ReactIconButton;
