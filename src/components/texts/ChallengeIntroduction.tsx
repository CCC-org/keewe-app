import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput, useTheme } from 'react-native-paper';

interface ChallengeIntroductionProps {
  infoText: string;
  inputValue: string;
  placeholder: string;
  setInputValue: (input: string) => void;
}

const ChallengeIntroduction = (props: ChallengeIntroductionProps) => {
  const { infoText, inputValue, placeholder, setInputValue } = props;
  const theme = useTheme();
  const [letterNumberColor, setLetterNumberColor] = useState<string>('grey');
  useEffect(() => {
    if (inputValue.length > 150) {
      setLetterNumberColor('red');
    } else {
      setLetterNumberColor('grey');
    }
  }, [inputValue]);
  return (
    <>
      <ScrollView>
        <View>
          <Text style={theme.fonts.text.caption1}>{infoText}</Text>
        </View>
        <View style={styles.intro}>
          <TextInput
            mode="outlined"
            value={inputValue}
            placeholder={placeholder}
            onChangeText={(inputValue) => setInputValue(inputValue)}
            outlineColor="grey"
            activeOutlineColor="grey"
            style={styles.input}
            multiline={true}
          />
          <Text style={{ ...styles.letterNumber, color: letterNumberColor }}>
            {150 - inputValue.length}
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

export default ChallengeIntroduction;

const styles = StyleSheet.create({
  intro: {
    flex: 1,
  },
  input: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    backgroundColor: 'white',
    paddingBottom: 25,
    height: 100,
  },
  letterNumber: {
    marginHorizontal: 15,
    textAlign: 'right',
    position: 'absolute',
    bottom: 20,
    left: 350,
  },
});
