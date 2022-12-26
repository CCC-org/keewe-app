import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

interface BottomSheetHeaderProps {
  onPress: () => void;
  onLeftButtonPress: () => void;
  title: string;
  headerRightButton: () => JSX.Element;
}

const BottomSheetHeader = ({
  onPress,
  onLeftButtonPress,
  title,
  headerRightButton,
}: BottomSheetHeaderProps) => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <AntDesign name="close" size={24} color="black" onPress={onLeftButtonPress} />
      <Text style={{ ...theme.fonts.text.body1.bold, ...styles.text }}>{title}</Text>
      {headerRightButton()}
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
    paddingBottom: 12,
  },
  text: {
    fontSize: 16,
    marginLeft: 38,
  },
});
