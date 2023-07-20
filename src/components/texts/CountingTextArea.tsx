import { ScrollView, StyleSheet, Text, View, TextInput, ViewProps } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'react-native-paper';

interface CountingTextAreaProps {
  isControlledInput?: boolean;
  infoText?: string;
  inputValue: string;
  placeholder: string;
  setInputValue: (input: string) => void;
  limit?: number;
  style?: any;
  height?: any;
  textInputMarginBottom?: number;
  autoFocus?: boolean;
  limitTextStyle?: any;
  multiline?: boolean;
  autoCapitalize: any;
}

const CountingTextArea = (props: CountingTextAreaProps) => {
  const {
    infoText,
    inputValue,
    placeholder,
    setInputValue,
    style,
    limit,
    height,
    textInputMarginBottom,
    autoFocus = false,
    multiline,
    autoCapitalize,
    isControlledInput,
  } = props;
  const theme = useTheme();
  const [letterNumberColor, setLetterNumberColor] = useState<string>('grey');
  useEffect(() => {
    if (inputValue.length > (limit ? limit : 150)) {
      setLetterNumberColor('red');
    } else {
      setLetterNumberColor('rgba(18, 19, 20, 0.5)');
    }
  }, [inputValue]);
  return (
    <ScrollView style={style}>
      {infoText && (
        <View>
          <Text style={{ ...theme.fonts.text.caption1, marginLeft: 12, opacity: 0.5 }}>
            {infoText}
          </Text>
        </View>
      )}
      <View
        style={{
          ...styles.intro,
          height: height ?? 140,
        }}
      >
        <TextInput
          // BUG: making TextInput a controlled component causes it to make unexpected cursor jumps and duplicate characters.
          value={isControlledInput ? inputValue : undefined}
          autoFocus={autoFocus}
          placeholder={placeholder}
          onChangeText={(text) => setInputValue(text)}
          style={{
            ...styles.input,
            marginBottom: textInputMarginBottom || 22,
          }}
          // multiline sets texts ios to top, android to center.
          // needs textAlignVertical to top on android
          multiline={multiline ?? true}
          selectionColor={'black'}
          autoCapitalize={autoCapitalize}
        />
        <Text style={{ ...styles.letterNumber, color: letterNumberColor, ...props.limitTextStyle }}>
          {(limit ? limit : 150) - inputValue.length}
        </Text>
      </View>
    </ScrollView>
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
    marginHorizontal: 12,
    marginTop: 12,
    marginBottom: 32,
    height: 140,
    maxHeight: 'auto',
  },
  input: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginTop: 10,
    fontSize: 16,
    height: '100%',
    textAlignVertical: 'top',
    fontFamily: 'pretendard',
  },
  letterNumber: {
    flex: 1,
    textAlign: 'right',
    position: 'absolute',
    bottom: 10,
    right: 16,
    fontSize: 12,
    fontWeight: '500',
  },
});
