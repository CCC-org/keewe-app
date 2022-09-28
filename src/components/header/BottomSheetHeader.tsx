import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import HeaderRightButton from './HeaderRightButton';
import { useTheme } from 'react-native-paper';

interface BottomSheetHeaderProps {
  onPress: () => void;
  conditionalValue: string;
}

const BottomSheetHeader = ({ onPress, conditionalValue }: BottomSheetHeaderProps) => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <AntDesign name="arrowleft" size={24} color="black" />
      <Text style={{ ...theme.fonts.text.body1.bold, ...styles.text }}>링크</Text>
      <HeaderRightButton
        text="완료"
        backGroundColor={conditionalValue.length ? '#b0e817' : '#12131420'}
        textColor={conditionalValue.length ? 'black' : '#ffffff'}
        disabled={false}
        borderLine={false}
        handlePress={onPress}
      />
    </View>
  );
};

export default BottomSheetHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 16,
    marginLeft: 23,
  },
});
