import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';

interface AddButtonProps {
  onPress: () => void;
}

const AddButton = ({ onPress }: AddButtonProps) => {
  const theme = useTheme();
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#B0E817', // Theme에 색상이 없는 것 같습니다!
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  text: {
    fontSize: 28,
  },
});
