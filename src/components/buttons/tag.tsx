import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

interface tagProps {
  title: string;
  isSelected: boolean;
  onClick: () => void;
}

const tag = ({ title, isSelected, onClick }: tagProps) => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.tag,
        { backgroundColor: theme.colors.graphic.green, opacity: isSelected ? 1 : 0 },
      ]}
    >
      {title}
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    borderRadius: 12,
    border: 'solid 1px black',
  },
});

export default tag;
