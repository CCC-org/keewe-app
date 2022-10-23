import { Pressable, PressableProps, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import theme from '../../theme/light';

const EditButton = (
  props: JSX.IntrinsicAttributes & PressableProps & React.RefAttributes<View>,
) => {
  return (
    <Pressable {...props} style={styles.container}>
      <Text
        style={{
          ...theme.fonts.text.caption1,
          marginLeft: 36,
          color: `${theme.colors.graphic.black}50`,
        }}
      >
        수정
      </Text>
    </Pressable>
  );
};

export default EditButton;

const styles = StyleSheet.create({
  container: {
    borderRightWidth: 0,
    borderRadius: 8,
    height: 68,
    width: 128,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});
