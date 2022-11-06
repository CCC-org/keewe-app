import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const FeedScreen = ({ navigation }) => {
  navigation.setOptions({
    headerShown: true,
    backgroundColor: 'red',
  });
  return (
    <View>
      <Text>MainScreen</Text>
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({});
