import { StyleSheet, View, TextInput } from 'react-native';
import React from 'react';
import { Text, useTheme } from 'react-native-paper';

interface AutoGrowScrollTextAreaProps {
  inputValue: string;
  placeholder: string;
  setInputValue: (input: string) => void;
  limit?: number;
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
}: AutoGrowScrollTextAreaProps) => {
  const theme = useTheme();

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={{ ...styles.input, ...theme.fonts.text.body1.regular }}
          value={inputValue}
          placeholder={placeholder}
          onChangeText={(inputValue) => setInputValue(inputValue)}
          multiline={true}
          numberOfLines={16}
          // activeUnderlineColor="white"
          // selectionColor="black"
          // underlineColor="white"
          maxLength={limit ? limit : 400}
          scrollEnabled={true}
          textAlignVertical="top"
          // textAlignVertical="top"
        />
        <View style={styles.letterNumberContainer}>
          <View style={styles.limitContainer}>
            <Text style={styles.limit}>{(limit ? limit : 400) - inputValue.length}</Text>
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
    backgroundColor: '#D9D9D9',
  },
  input: {
    width: '100%',
    height: 230,
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  letterNumberContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  limit: {
    fontSize: 14,
    fontFamily: 'pretendard',
  },
  limitContainer: {
    backgroundColor: '#F8F8F4',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});
