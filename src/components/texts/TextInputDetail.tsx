import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput, Text, useTheme } from 'react-native-paper';

interface TextInputDetailProps {
  setInputValue: (input: string) => void;
  infoText: string;
  inputValue: string;
  label: string;
  placeholder: string;
  letterLimit: number;
}

const TextInputDetail = (props: TextInputDetailProps) => {
  const { setInputValue, inputValue, infoText, label, placeholder, letterLimit } = props;
  const theme = useTheme();
  const [inputUnderlineColor, setInputUnderlineColor] = useState<string>('grey');
  const [inputValueColor, setInputValueColor] = useState<string>('grey');
  const [focused, setFocused] = useState<boolean>(false);
  useEffect(() => {
    if (inputValue.length > letterLimit) {
      setInputUnderlineColor('red');
      setInputValueColor('red');
    } else if (focused) {
      setInputUnderlineColor('#486006');
      setInputValueColor('black');
    } else if (!focused) {
      setInputUnderlineColor('grey');
      setInputValueColor('grey');
    }
  }, [inputValue, focused]);

  return (
    <>
      <View>
        <Text style={theme.fonts.text.caption1}>{infoText}</Text>
      </View>
      <TextInput
        label={label}
        value={inputValue}
        placeholder={placeholder}
        onChangeText={(inputValue) => setInputValue(inputValue)}
        underlineColor={inputUnderlineColor}
        activeUnderlineColor={inputUnderlineColor}
        style={{
          margin: 10,
          backgroundColor: 'white',
        }}
        onFocus={() => setFocused(true)}
        onEndEditing={() => setFocused(false)}
        theme={{
          colors: {
            text: inputValueColor,
          },
        }}
      />
    </>
  );
};

export default TextInputDetail;
