import { Pressable, PressableProps, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FontText, MonoText } from '../../components/texts/StyledText';

const EditButton = (
  props: JSX.IntrinsicAttributes & PressableProps & React.RefAttributes<View>,
) => {
  return (
    <Pressable {...props} style={styles.container}>
      <FontText style={{ fontSize: 12, paddingLeft: 24 }}>수정</FontText>
    </Pressable>
  );
};

export default EditButton;

const styles = StyleSheet.create({
  container: {
    //  borderColor: '#12131420',
    borderRightWidth: 0,
    borderRadius: 8,
    height: 68,
    width: 128,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});
