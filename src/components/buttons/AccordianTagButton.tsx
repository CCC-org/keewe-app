import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Button, useTheme } from 'react-native-paper';

interface AccordianTagButtonProps {
  children: string;
}

const AccordianTagButton = (props: AccordianTagButtonProps) => {
  const { children: activity } = props;
  const themeProp = useTheme();
  const styles = makeStyles(themeProp);

  return (
    <Pressable style={styles.activityContainer} onPress={() => alert(activity)}>
      <Text style={styles.activityText}>{activity}</Text>
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
