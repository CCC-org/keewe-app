import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ViewProps } from '../Themed';

const DividerBar = (props: ViewProps) => {
  return (
    <View
      {...props}
      style={[
        {
          width: '100%',
          borderBottomWidth: 1,
          borderBottomColor: '#12131410',
        },
        props.style,
      ]}
    ></View>
  );
};

export default DividerBar;

const styles = StyleSheet.create({});
