import { StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';
import { ViewProps } from '../Themed';

interface DividerBarProps {
  style?: ViewStyle;
}

const DividerBar = ({ style, ...props }: DividerBarProps) => {
  return (
    <View
      style={[
        {
          width: '100%',
          borderBottomWidth: 1,
          borderBottomColor: '#12131410',
        },
        style,
      ]}
    ></View>
  );
};

export default DividerBar;

const styles = StyleSheet.create({});
