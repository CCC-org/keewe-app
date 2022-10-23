import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface Props {
  color: string;
  style?: any;
  selected: boolean;
}

const ColorSelectRadioButton = (props: Props) => {
  return (
    <View
      style={[
        {
          height: 24,
          width: 24,
          //  borderColor: props.color,
          backgroundColor: props.color,
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
        },
        props.style,
      ]}
    >
      {props.selected ? (
        <View
          style={{
            height: 32,
            width: 32,
            borderRadius: 16,
            borderWidth: 2,
            borderColor: '#b0e817',
            // backgroundColor: '#B0e817',
          }}
        />
      ) : null}
    </View>
  );
};

export default ColorSelectRadioButton;

const styles = StyleSheet.create({});
