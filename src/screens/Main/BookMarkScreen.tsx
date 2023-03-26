import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

const BookMarkScreen = () => {
  const theme = useTheme();
  return (
    <View style={styles.header}>
      <Text style={theme.fonts.text.display}>북마크</Text>
    </View>
  );
};

export default BookMarkScreen;

const styles = StyleSheet.create({
  header: {
    margin: 16,
  },
});
