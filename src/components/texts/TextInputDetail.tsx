import { View } from 'react-native';
import React from 'react';
import { TextInput, Text, useTheme } from 'react-native-paper';

interface TextInputDetailProps {
  setInputValue: (input: string) => void;
  infoText: string;
  inputValue: string;
  label: string;
  placeholder: string;
}

const TextInputDetail = (props: TextInputDetailProps) => {
  const { setInputValue, inputValue, infoText, label, placeholder } = props;
  const theme = useTheme();
  return (
    <>
      <View>
        <Text style={theme.fonts.text.display}>{infoText}</Text>
      </View>
      <TextInput
        label={label}
        value={inputValue}
        placeholder={placeholder}
        onChangeText={(inputValue) => setInputValue(inputValue)}
        underlineColor="#486006"
        activeUnderlineColor="#486006"
        style={{ margin: 10, backgroundColor: 'white' }}
      />
    </>
  );
};

export default TextInputDetail;
