import {
  StyleSheet,
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import React from 'react';
import { Text, useTheme } from 'react-native-paper';

interface AutoGrowScrollTextAreaProps {
  inputValue: string;
  placeholder: string;
  setInputValue: (input: string) => void;
  limit: number;
  style?: any;
  height?: number;
  autoFocus?: boolean;
  onContentSizeChange?: (event: any) => void;
}

const StaticSizeScrollTextArea = ({
  inputValue,
  placeholder,
  setInputValue,
  limit,
  autoFocus,
}: AutoGrowScrollTextAreaProps) => {
  const theme = useTheme();

  const handleTextChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const { text } = event.nativeEvent;
    setInputValue(text);
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={{ ...styles.input, ...theme.fonts.text.body1.regular }}
          value={inputValue}
          placeholder={placeholder}
          onChange={handleTextChange}
          multiline={true}
          numberOfLines={16}
          scrollEnabled={true}
          textAlignVertical="top"
          autoFocus={autoFocus}
        />
        <View style={styles.letterNumberContainer}>
          <View style={styles.limitContainer}>
            <Text
              style={{
                ...theme.fonts.text.body2.regular,
                color: inputValue.length > limit ? '#FF0000' : '#000000',
              }}
            >
              {(limit ? limit : 400) - inputValue.length}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default StaticSizeScrollTextArea;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  input: {
    width: '100%',
    height: 230,
    paddingHorizontal: 8,
  },
  letterNumberContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  limitContainer: {
    backgroundColor: '#F8F8F4',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});
