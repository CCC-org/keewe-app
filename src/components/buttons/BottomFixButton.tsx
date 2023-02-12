import { StyleSheet, Text, View, Pressable, ViewStyle, TextStyle } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

interface BottomFixButtonProps {
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  isActive: boolean;
  text: string;
  color?: string;
  textColor?: string;
  width: number;
  height?: number;
  chevron?: boolean;
  onPress: () => void;
}

const BottomFixButton = ({
  isActive,
  text,
  color,
  textColor,
  width,
  height,
  chevron,
  onPress,
  ...props
}: BottomFixButtonProps) => {
  const theme = useTheme();
  return (
    <Pressable
      onPress={() => {
        if (!isActive) return;
        onPress();
      }}
    >
      <View
        style={[
          {
            ...styles.Bottom,
            width: width,
            height: height ?? 56,
            backgroundColor: color || theme.colors.graphic.black,
            opacity: isActive ? 1 : 0.2,
          },
          props.buttonStyle,
        ]}
      >
        <Text
          style={[
            { ...theme.fonts.text.body1.bold, color: textColor ? textColor : 'white' },
            props.textStyle,
          ]}
        >
          {text}
        </Text>
        {chevron &&
          (chevron ? (
            <Feather name="chevron-right" size={20} color={`${theme.colors.graphic.black}cc`} />
          ) : null)}
      </View>
    </Pressable>
  );
};

export default BottomFixButton;

const styles = StyleSheet.create({
  Bottom: {
    borderRadius: 50,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
