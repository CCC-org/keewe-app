import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import React from 'react';

const ActivitySelectionScreen = () => {
  const themeProp = useTheme();
  const styles = makeStyles(themeProp);

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>활동분야를 알려주시오</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  screenTitle: {
    fontSize: 30,
  },
});

function makeStyles(theme: ReactNativePaper.Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.brand.surface.container,
    },
    screenTitle: {
      fontSize: 30,
    },
  });
}

export default ActivitySelectionScreen;
