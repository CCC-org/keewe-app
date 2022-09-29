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
  onContentSizeChange: (event: any) => void;
}

const AutoGrowScrollTextArea = ({
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
        numberOfLines={10}
        onContentSizeChange={onContentSizeChange}
        activeUnderlineColor="white"
        selectionColor="black"
        underlineColor="white"
      />
      <View style={styles.letterNumberContainer}>
        <Text style={styles.limit}>{(limit ? limit : 400) - inputValue.length}</Text>
      </View>
    </View>
  );
};

export default AutoGrowScrollTextArea;

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
    backgroundColor: 'white',
    fontSize: 16,
    fontFamily: 'pretendard',
    lineHeight: 24,
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
