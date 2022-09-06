import {
  StyleSheet,
  Text,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  LayoutChangeEvent,
} from 'react-native';
import React, { useState } from 'react';
import { useTheme } from 'react-native-paper';

interface ConditionalButtonProps {
  isActive: boolean;
  text: string;
  color?: string;
  textColor?: string;
  width: number;
  onPress: () => void;
}

const fullHeightOfScreen = Dimensions.get('window').height;

const ConditionalButton = ({
  isActive,
  onPress,
  text,
  width,
  color,
  textColor,
}: ConditionalButtonProps) => {
  const [offset, setOffset] = useState(0);

  function handleLayout(event: LayoutChangeEvent) {
    // const { y: yCoordinate, height } = event.nativeEvent.layout;
    // setOffset(fullHeightOfScreen - yCoordinate - height);
  }

  const theme = useTheme();
  return (
    <KeyboardAvoidingView
      onLayout={handleLayout}
      behavior={Platform.select({ ios: 'position' })} // position || padding
      keyboardVerticalOffset={Platform.select({ ios: offset })}
      style={styles.container}
    >
      <View
        style={{
          ...styles.btn,
          width: width,
          backgroundColor: color || theme.colors.graphic.black,
          opacity: isActive ? 1 : 0.2,
        }}
      >
        <Pressable
          hitSlop={{ bottom: 25, left: width / 2, right: width / 2, top: 25 }}
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
    // flex inside container causes errors in android.
    // flex: 1
    marginBottom: 25,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btn: {
    height: 56,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
    fontSize: 18,
    color: 'white',
  },
});
