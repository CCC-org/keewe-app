import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

interface BottomSheetOptionProps {
  title: string;
  onPress: () => void;
}

const BottomSheetOption = ({ title, onPress }: BottomSheetOptionProps) => {
  const theme = useTheme();
  return (
    <Pressable onPress={onPress}>
      <View style={styles.title}>
        <Text style={theme.fonts.text.body1.regular}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default BottomSheetOption;

const styles = StyleSheet.create({
  title: {
    justifyContent: 'center',
    padding: 16,
  },
});
