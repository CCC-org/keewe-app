import { Pressable, PressableProps, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FontText, MonoText } from '../../components/texts/StyledText';

const EditButton = (
  props: JSX.IntrinsicAttributes & PressableProps & React.RefAttributes<View>,
) => {
  return (
    <Pressable {...props} style={styles.container}>
      <FontText style={{ fontSize: 14, paddingLeft: 36 }}>수정</FontText>
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
