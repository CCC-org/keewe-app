import { Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

interface AccordianTagButtonProps {
  genre: string;
}

const AccordianTagButton = (props: AccordianTagButtonProps) => {
  const { genre } = props;
  const themeProp = useTheme();
  const styles = makeStyles(themeProp);

  const handlePress = () => {
    alert(genre);
  };

  return (
    <Pressable style={styles.activityContainer} onPress={handlePress}>
      <Text style={styles.activityText}>asdasd</Text>
    </Pressable>
  );
};

function makeStyles(theme: ReactNativePaper.Theme) {
  return StyleSheet.create({
    activityContainer: {
      backgroundColor: theme.colors.graphic.yellow,
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      minWidth: 60,
      maxWidth: 120,
      borderRadius: 100,
      margin: 4,
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    activityText: {
      fontSize: theme.fonts.text.body1.bold.fontSize,
      fontWeight: theme.fonts.text.body1.bold.fontWeight,
    },
  });
}

export default AccordianTagButton;
