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

interface BlackBelowButtonProps {
  isActive: boolean;
  text: string;
  onPress: () => void;
}

const fullHeightOfScreen = Dimensions.get('window').height;

const BlackBelowButton = ({ isActive, onPress, text }: BlackBelowButtonProps) => {
  const [offset, setOffset] = useState(0);

  function handleLayout(event: LayoutChangeEvent) {
    const { y: yCoordinate, height } = event.nativeEvent.layout;
    setOffset(fullHeightOfScreen - yCoordinate - height);
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
          backgroundColor: theme.colors.graphic.black,
          opacity: isActive ? 1 : 0.2,
        }}
      >
        <Pressable hitSlop={{ bottom: 25, left: 170, right: 170, top: 25 }} onPress={onPress}>
          <Text style={styles.text}>{text}</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default BlackBelowButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 25,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btn: {
    width: 343,
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
