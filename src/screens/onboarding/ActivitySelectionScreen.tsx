import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import React from 'react';
import ActivityAccordian from '../../components/accordian/ActivityAccordian';

const ActivitySelectionScreen = () => {
  const themeProp = useTheme();
  const styles = makeStyles(themeProp);

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>활동분야를 알려주세요</Text>
      <View style={styles.accordianContainer}>
        <ActivityAccordian title="실무/취업" genre="practical" />
        <ActivityAccordian title="재테크" genre="investment" />
        <ActivityAccordian title="언어/외국어" genre="language" />
        <ActivityAccordian title="문화/예술" genre="culture" />
        <ActivityAccordian title="음악" genre="music" />
        <ActivityAccordian title="운동/액티비티" genre="sport" />
        <ActivityAccordian title="푸드" genre="food" />
        <ActivityAccordian title="뷰티/패션" genre="beauty" />
      </View>
    </View>
  );
};

function makeStyles(theme: ReactNativePaper.Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      // backgroundColor: theme.colors.brand.surface.main,
      backgroundColor: theme.colors.brand.surface.container,
      paddingLeft: 12,
      paddingRight: 12,
    },
    accordianContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      // backgroundColor: theme.colors.brand.surface.main,
      backgroundColor: theme.colors.brand.surface.container,
      width: '100%',
    },
    screenTitle: {
      fontSize: theme.fonts.text.display.fontSize,
      fontWeight: theme.fonts.text.display.fontWeight,
      marginTop: 4,
    },
  });
}

export default ActivitySelectionScreen;
