import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

interface BottomSheetOptionProps {
  title: string;
  select?: boolean;
  leftIcon?: JSX.Element;
  onPress: () => void;
}

const BottomSheetOption = ({ title, select, leftIcon, onPress }: BottomSheetOptionProps) => {
  const theme = useTheme();
  return (
    <Pressable onPress={onPress}>
      <View style={styles.title}>
        <Text
          style={{
            fontFamily: 'pretendard',
            fontSize: 14,
            color: select ? theme.colors.brand.onprimary.container : theme.colors.graphic.black,
          }}
        >
          {title}
        </Text>
        {leftIcon}
      </View>
    </Pressable>
  );
};

export default BottomSheetOption;

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    height: 56,
  },
});
