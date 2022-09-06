import { ScrollView, StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'react-native-paper';

interface CountingTextAreaProps {
  infoText: string;
  inputValue: string;
  placeholder: string;
  setInputValue: (input: string) => void;
}

const CountingTextArea = (props: CountingTextAreaProps) => {
  const { infoText, inputValue, placeholder, setInputValue } = props;
  const theme = useTheme();
  const [letterNumberColor, setLetterNumberColor] = useState<string>('grey');
  useEffect(() => {
    if (inputValue.length > 150) {
      setLetterNumberColor('red');
    } else {
      setLetterNumberColor('rgba(18, 19, 20, 0.5)');
    }
  }, [inputValue]);
  return (
    <>
      <ScrollView>
        <View>
          <Text style={{ ...theme.fonts.text.caption1, marginLeft: 12, opacity: 0.5 }}>
            {infoText}
          </Text>
        </View>
        <View style={styles.intro}>
          <TextInput
            value={inputValue}
            placeholder={placeholder}
            onChangeText={(inputValue) => setInputValue(inputValue)}
            style={styles.input}
            multiline={true}
            selectionColor={'black'}
          />
          <Text style={{ ...styles.letterNumber, color: letterNumberColor }}>
            {150 - inputValue.length}
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

export default CountingTextArea;

const styles = StyleSheet.create({
  intro: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(18, 19, 20, 0.1)',
    paddingBottom: 10,
    marginHorizontal: 10,
    marginTop: 12,
    marginBottom: 32,
    height: 140,
  },
  input: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingBottom: 20,
    marginHorizontal: 16,
    marginBottom: 22,
    marginTop: 10,
    height: 102,
    fontSize: 16,
  },
  letterNumber: {
    flex: 1,
    marginHorizontal: 15,
    textAlign: 'right',
    position: 'absolute',
    bottom: 10,
    left: 310,
    fontSize: 12,
    fontWeight: '500',
  },
});
