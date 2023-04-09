import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

interface MainTabHeaderProp {
  text: string;
}

const MainTabHeader = ({ text }: MainTabHeaderProp) => {
  const theme = useTheme();

  return (
    <View style={styles.header}>
      <Text style={theme.fonts.text.display}>{text}</Text>
    </View>
  );
};

export default MainTabHeader;

const styles = StyleSheet.create({
  header: {
    margin: 16,
  },
});
