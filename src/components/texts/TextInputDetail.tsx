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
    if (inputValue.length > 0) {
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
      setInputValueColor('#121314');
    } else if (!focused) {
      setInputUnderlineColor('rgba(12,13,14,0.1)');
      setInputValueColor('rgba(12,13,14,0.1)');
    }
  }, [inputValue, focused]);

  return (
    <>
      <View>
        <Text style={{ ...theme.fonts.text.caption1, marginLeft: 12, opacity: 0.5 }}>
          {infoText}
        </Text>
      </View>
      <TextInput
        label={label}
        autoFocus={true}
        selectionColor={'black'}
        right={
          <TextInput.Icon
            style={{ opacity: isButtonEnabled ? 0.2 : 0, marginRight: -15 }}
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
          marginHorizontal: 12,
          paddingHorizontal: 0,
        }}
        dense={true}
        onFocus={() => {
          setFocused(true);
          setIsButtonEnabled(true);
        }}
        onEndEditing={() => {
          setFocused(false);
          setIsButtonEnabled(false);
        }}
        placeholderTextColor={'rgba(18, 19, 20, 0.3)'}
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
    // marginLeft: 12,
  },
});

export default TextInputDetail;
