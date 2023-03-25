import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';

interface CircularCheckboxProps {
  isChecked: boolean;
}

const CircularCheckbox = ({ isChecked }: CircularCheckboxProps) => {
  if (!isChecked) {
    return <View style={styles.container}></View>;
  }
  return (
    <View style={styles.validContainer}>
      {!isChecked || <Feather name="check" size={14} color={'white'} />}
    </View>
  );
};

export default CircularCheckbox;

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f1f1e9',
    marginBottom: 4,
  },
  validContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#b0e817',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
});
