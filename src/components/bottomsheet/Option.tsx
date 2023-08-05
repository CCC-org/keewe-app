import React from 'react';
import { useTheme } from 'react-native-paper';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

interface OptionProps {
  xml: string;
  text: string;
  onPress: () => void;
  backgroundColor?: string;
}

const Option = ({ xml, text, onPress, backgroundColor }: OptionProps) => {
  const theme = useTheme();
  return (
    <View style={{ alignItems: 'center' }}>
      <Pressable onPress={onPress}>
        <View
          style={{
            ...styles.option,
            backgroundColor: backgroundColor
              ? backgroundColor
              : theme.colors.brand.surface.container1,
          }}
        >
          <SvgXml xml={xml} />
        </View>
      </Pressable>
      <Text style={theme.fonts.text.body2.regular}>{text}</Text>
    </View>
  );
};

export default Option;

const styles = StyleSheet.create({
  container: {},
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 18,
  },
  option: {
    width: 64,
    height: 64,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    marginHorizontal: 22,
  },
});
