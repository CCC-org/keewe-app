import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';

interface TextInputDetailProps {
  placeholder: string;
  setInputValue: (input: string) => void;
  inputValue: string;
  errorMessage: string;
}

const SmallTextInput = ({
  placeholder,
  setInputValue,
  inputValue: input,
  errorMessage,
}: TextInputDetailProps) => {
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const handleChangeText = (inputValue: string) => {
    setInputValue(inputValue);
  };

  useEffect(() => {
    if (input.length > 0) setIsButtonEnabled(true);
    else setIsButtonEnabled(false);
  }, [input]);
  // focus
  return (
    <>
      <TextInput
        right={
          <TextInput.Icon
            style={{ opacity: isButtonEnabled ? 0.2 : 0 }}
            onPress={() => setInputValue('')}
            name="close-circle"
          />
        }
        autoFocus={true}
        value={input}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        activeUnderlineColor="rgba(18, 19, 20, 0.1)"
        style={styles.textInput}
        dense={true}
      />
      <Text style={styles.errorMessage}>{errorMessage}</Text>
    </>
  );
};

export default SmallTextInput;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#fff',
    paddingHorizontal: 2,
    paddingBottom: 4,
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 4,
  },
});
