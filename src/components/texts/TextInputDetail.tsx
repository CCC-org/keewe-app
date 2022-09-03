import { View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput, Text, useTheme } from 'react-native-paper';

interface TextInputDetailProps {
  setInputValue: (input: string) => void;
  infoText?: string;
  inputValue: string;
  label?: string;
  placeholder: string;
  letterLimit: number;
  errorMessage: string;
}

const TextInputDetail = (props: TextInputDetailProps) => {
  const { setInputValue, inputValue, infoText, label, placeholder, letterLimit, errorMessage } =
    props;
  const theme = useTheme();
  const [inputUnderlineColor, setInputUnderlineColor] = useState<string>('grey');
  const [inputValueColor, setInputValueColor] = useState<string>('grey');
  const [focused, setFocused] = useState<boolean>(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const handleTextInputButton = () => setInputValue('');

  useEffect(() => {
    if (inputValue.length > 1) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [inputValue]);

  const handleChangeText = (inputValue: string) => {
    setInputValue(inputValue);
  };

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
        right={
          <TextInput.Icon
            style={{ opacity: isButtonEnabled ? 0.2 : 0 }}
            onPress={handleTextInputButton}
            name="close-circle"
          />
        }
        value={inputValue}
        placeholder={placeholder}
        onChangeText={(text) => handleChangeText(text)}
        underlineColor={inputUnderlineColor}
        activeUnderlineColor={inputUnderlineColor}
        style={{
          fontWeight: '600',
          fontSize: 22,
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
      {errorMessage.length > 0 && <Text style={styles.error}>{errorMessage}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 12,
  },
});

export default TextInputDetail;
