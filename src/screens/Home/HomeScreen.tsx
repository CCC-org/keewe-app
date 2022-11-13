import { StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';

const HomeScreen = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      backgroundColor: 'white',
    });
  }, []);
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
