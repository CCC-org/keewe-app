import {
  StyleSheet,
  Text,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

interface ConditionalButtonProps {
  isActive?: boolean;
  text: string;
  color?: string;
  textColor?: string;
  width: number | string;
  borderRadius?: number;
  onPress: () => void;
  style?: ViewStyle;
  keyboardResponsive?: boolean;
}

// const fullHeightOfScreen = Dimensions.get('window').height;

const ConditionalButton = ({
  isActive = true,
  onPress,
  text,
  width,
  color,
  textColor,
  borderRadius,
  style: styleProp,
  keyboardResponsive = false,
}: ConditionalButtonProps) => {
  const theme = useTheme();
  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'position' })} // position || padding
      keyboardVerticalOffset={Platform.select({ ios: keyboardResponsive ? 120 : 0 })}
      style={styles.container}
    >
      <Pressable
        onPress={() => {
          if (!isActive) return;
          onPress();
        }}
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
          <Text style={{ ...styles.text, color: textColor ? textColor : 'white' }}>{text}</Text>
        </View>
      </Pressable>
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
