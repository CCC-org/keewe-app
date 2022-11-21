import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ProgressBar } from 'react-native-paper';

interface CustomProgressBarProps {
  progressValue: number;
  max: number;
}

const NumberProgressBar = ({ progressValue: progress, max }: CustomProgressBarProps) => {
  const progressPercentage = progress / max;
  const styles = makeStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.indicator}>
        <Text style={{ color: progressPercentage > 1 ? 'red' : '#B0E817' }}>{progress}</Text>{' '}
        <Text style={styles.under}> / {max}</Text>
      </Text>

      <ProgressBar
        progress={progressPercentage}
        style={styles.progressBar}
        color={progressPercentage > 1 ? '#f24822' : '#B0E817'}
      />
    </View>
  );
};

export default NumberProgressBar;

function makeStyles() {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '80%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    indicator: {
      fontSize: 12,
      fontWeight: '500',
    },
    under: {
      color: '#00000060',
      fontSize: 12,
    },
    progressBar: {
      width: 240,
      height: 4,
      backgroundColor: '#e1e1d0',
    },
  });
}
