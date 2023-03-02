import {
  StyleSheet,
  Text,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  LayoutChangeEvent,
  ViewStyle,
} from 'react-native';
import React, { useState } from 'react';
import { useTheme } from 'react-native-paper';

interface ConditionalButtonProps {
  isActive: boolean;
  text: string;
  color?: string;
  textColor?: string;
  width: number | string;
  borderRadius?: number;
  onPress: () => void;
  style?: ViewStyle;
}

const fullHeightOfScreen = Dimensions.get('window').height;

const ConditionalButton = ({
  isActive,
  onPress,
  text,
  width,
  color,
  textColor,
  borderRadius,
  style: styleProp,
}: ConditionalButtonProps) => {
  const [offset, setOffset] = useState(0);

  function handleLayout(event: LayoutChangeEvent) {
    const { y: yCoordinate = 0, height = 0 } = event.nativeEvent.layout;
    setOffset(fullHeightOfScreen - yCoordinate - height);
  }

  const theme = useTheme();
  return (
    <KeyboardAvoidingView
      onLayout={handleLayout}
      behavior={Platform.select({ ios: 'padding' })} // position || padding
      keyboardVerticalOffset={Platform.select({ ios: offset })}
      style={styles.container}
    >
      <View
        style={[
          {
            ...styles.btn,
            width: width,
            borderRadius: borderRadius ?? 50,
            backgroundColor: color || theme.colors.graphic.black,
            opacity: isActive ? 1 : 0.2,
          },
          styleProp,
        ]}
      >
        <Pressable
          hitSlop={
            typeof width === 'number'
              ? { bottom: 25, left: width / 2, right: width / 2, top: 25 }
              : 0
          }
          onPress={() => {
            if (!isActive) return;
            onPress();
          }}
        >
          <Text style={{ ...styles.text, color: textColor ? textColor : 'white' }}>{text}</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ConditionalButton;

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btn: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
    fontSize: 18,
    color: 'white',
  },
});
