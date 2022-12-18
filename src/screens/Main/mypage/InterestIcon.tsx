import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

interface InterestIconProps {
  title: string;
  textColor: string;
  backgroundColor: string;
}

const InterestIcon = ({ title, textColor, backgroundColor }: InterestIconProps) => {
  const theme = useTheme();
  return (
    <View style={{ ...styles.container, backgroundColor: backgroundColor, borderColor: textColor }}>
      <Text style={{ ...theme.fonts.text.body2.bold, color: textColor }}>{title}</Text>
    </View>
  );
};

export default InterestIcon;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 2,
    marginVertical: 4,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
    borderRadius: 100,
    borderWidth: 1,
  },
});
