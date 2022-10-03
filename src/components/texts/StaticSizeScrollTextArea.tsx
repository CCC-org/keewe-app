import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text, TextInput, useTheme } from 'react-native-paper';

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
  onContentSizeChange,
  inputValue,
  placeholder,
  setInputValue,
  limit,
}: AutoGrowScrollTextAreaProps) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <TextInput
        style={{ ...styles.input }}
        value={inputValue}
        placeholder={placeholder}
        onChangeText={(inputValue) => setInputValue(inputValue)}
        multiline={true}
        activeUnderlineColor="white"
        selectionColor="black"
        underlineColor="white"
        maxLength={limit ? limit : 400}
        scrollEnabled={true}
      />
      <View style={styles.letterNumberContainer}>
        <Text style={styles.limit}>{(limit ? limit : 400) - inputValue.length}</Text>
      </View>
    </View>
  );
};

export default StaticSizeScrollTextArea;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#12131410',
    paddingBottom: 8,
  },
  input: {
    width: '100%',
    minHeight: 200,
    backgroundColor: '#d9d9d9',
    fontSize: 16,
    fontFamily: 'pretendard',
    lineHeight: 24,
    borderRadius: 12,
  },
  letterNumberContainer: {
    width: '100%',
    alignItems: 'flex-end',
    paddingRight: 12,
  },
  limit: {
    fontSize: 14,
    fontFamily: 'pretendard',
  },
});
