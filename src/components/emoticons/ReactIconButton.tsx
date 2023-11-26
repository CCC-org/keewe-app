/* eslint-disable indent */
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Animated, Easing } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Pressable, Text, StyleSheet } from 'react-native';
import { InsightAPI } from '../../utils/api/InsightAPI';
import { FlyingView, ObjectConfig } from 'react-native-flying-objects';
import theme from '../../theme/light';

interface ReactIconButtonProps {
  xml: string;
  color: string;
  taps?: number;
  name: string;
  clicked: boolean;
  insightId: number;
}

const ReactIconButton = ({ xml, color, taps, name, clicked, insightId }: ReactIconButtonProps) => {
  const opacityValue = useRef(new Animated.Value(0)).current;
  const [object, setObject] = useState<ObjectConfig[]>([]);
  const [text, setText] = useState<number>();
  const [tab, setTab] = useState<boolean>(false);

  const { mutate: insightReact } = useMutation(InsightAPI.react, {
    onSuccess: (response) => {
      setText(response?.data.count);
      setTab(true);
    },
  });

  useEffect(() => {
    setText(taps ?? 0);
  }, [taps]);

  const handleClick = () => {
    insightReact({ insightId, reactionType: name, value: 1 });
    setObject((prev) => [...prev, objectConfig]);
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

  const objectConfig = useMemo(
    () => ({
      object: <SvgXml xml={xml} height={20} width={20} />,
      right: {
        fromValue: 15,
        toValue: Math.floor(Math.random() * 30),
        duration: 1200,
        easing: Easing.bezier(
          Math.floor(Math.random() * 10) / 10,
          Math.floor(Math.random() * 10) / 10 + 0.7,
          Math.floor(Math.random() * 10) / 10,
          Math.floor(Math.random() * 10) / 10 + 0.7,
        ),
      },
      top: {
        fromValue: 100,
        toValue: 35,
        duration: 1200,
        easing: Easing.bezier(0.5, 1.0, 0.5, 1.0),
      },
      show: {},
      hide: {},
    }),
    [object],
  );

  return (
    <>
      <Pressable onPress={handleClick}>
        <Animated.View
          style={{
            backgroundColor:
              clicked || tab
                ? color
                : opacityValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [theme.colors.graphic.white, color],
                  }),
            padding: 8,
            marginTop: 12,
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
                marginLeft: 4,
                fontFamily: 'podkovaBold',
                fontSize: 14,
                lineHeight: 16,
              }}
            >
              <Text>{text}</Text>
            </Animated.Text>
          )}
        </Animated.View>
        <FlyingView
          object={object}
          containerProps={{ style: { position: 'absolute', bottom: 20 } }}
        />
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
    marginRight: 8,
  },
});

export default ReactIconButton;
