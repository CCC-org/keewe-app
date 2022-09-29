import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-paper';

interface AutoGrowScrollTextAreaProps {
  onContentSizeChange: (event: any) => void;
}

const AutoGrowScrollTextArea = ({ onContentSizeChange }: AutoGrowScrollTextAreaProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input]}
        multiline={true}
        numberOfLines={4}
        placeholder="Type something"
        onContentSizeChange={onContentSizeChange}
        underlineColor="white"
        activeUnderlineColor="black"
      />
    </View>
  );
};

export default AutoGrowScrollTextArea;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    minHeight: 200,
    borderBottomWidth: 1,
    backgroundColor: 'white',
  },
});
