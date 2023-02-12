import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { pencil } from '../../constants/Icons/home/pencil';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const GoToUploadButton = () => {
  const navigation = useNavigation();

  const handleNavigateToUpload = () => {
    navigation.navigate('Upload');
  };
  return (
    <Pressable style={styles.pencil} onPress={handleNavigateToUpload}>
      <SvgXml xml={pencil} />
    </Pressable>
  );
};

export default GoToUploadButton;

const styles = StyleSheet.create({
  pencil: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#b0e817',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 1,
  },
});
