import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import React, { useState } from 'react';
import ActivityAccordian from '../../components/accordian/ActivityAccordian';
import { ActivityGroupInterface, ActivityTags } from '../../constants/ActivitySelection/tags';

const ActivitySelectionScreen = () => {
  const [activities, setActivities] = useState<ActivityGroupInterface>(ActivityTags);
  const themeProp = useTheme();
  const styles = makeStyles(themeProp);

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>활동분야를 알려주세요</Text>
      <View style={styles.accordianContainer}>
        <ActivityAccordian title="실무/취업" genre="practical" activities={activities} />
        <ActivityAccordian title="실무/취업" genre="practical" activities={activities} />
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
      backgroundColor: theme.colors.brand.surface.container,
      paddingLeft: 12,
      paddingRight: 12,
    },
    accordianContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: 'red',
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
