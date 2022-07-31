import { Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { useAppDispatch } from '../../redux/store';
import { selectActivityTag } from '../../redux/slices/activitySlice/activitySlice';

interface AccordianTagButtonProps {
  genre: string;
  isChecked: boolean;
  tagName: string;
  themeColor: string;
  tagId: number;
}

const AccordianTagButton = (props: AccordianTagButtonProps) => {
  const { genre, isChecked, tagName, themeColor, tagId } = props;
  const themeProp = useTheme();
  const styles = makeStyles(themeProp, isChecked, themeColor);
  const dispatch = useAppDispatch();

  const handlePress = () => {
    dispatch(selectActivityTag({ genre, tagId, isChecked }));
  };

  return (
    <Pressable style={styles.activityContainer} onPress={handlePress}>
      <Text style={styles.activityText}>{tagName}</Text>
    </Pressable>
  );
};

function makeStyles(theme: ReactNativePaper.Theme, isChecked: boolean, themeColor: string) {
  return StyleSheet.create({
    activityContainer: {
      backgroundColor: isChecked ? themeColor : 'white',
      opacity: isChecked ? 0.4 : 1,
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
