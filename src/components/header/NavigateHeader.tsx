import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { useTheme } from 'react-native-paper';

interface NavigateHeaderProps {
  title: string;
  handlePressBack: () => void;
  button: JSX.Element;
}

const NavigateHeader = (props: NavigateHeaderProps) => {
  const { title, handlePressBack, button } = props;
  const theme = useTheme();
  return (
    <>
      <View style={styles.header}>
        <Pressable onPress={handlePressBack}>
          <Icon name="arrowleft" size={30} color={theme.colors.graphic.black} />
        </Pressable>
        <Text style={theme.fonts.text.headline1}>{title}</Text>
        {button}
      </View>
    </>
  );
};

export default NavigateHeader;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
  },
});
