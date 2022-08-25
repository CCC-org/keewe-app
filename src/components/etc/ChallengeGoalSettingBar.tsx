import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from 'react-native-paper';
import { Slider } from '@miblanchard/react-native-slider';

// create alias for interface
interface ChallengeGoalSettingBarProps {
  minValue: number;
  maxValue: number;
  value: number;
  unit: string;
  infoText: string;
  onChange: (value: number | number[]) => void;
}

export default function ChallengeGoalSettingBar({
  value: valueProp,
  minValue,
  maxValue,
  infoText,
  onChange,
  unit,
}: ChallengeGoalSettingBarProps) {
  const themeProp = useTheme();
  const styles = makeStyles(themeProp);

  return (
    <View style={styles.container}>
      <View style={styles.InfoContainer}>
        <Text style={styles.infoText}>{infoText}</Text>
        <View>
          <Text style={styles.challengeSettingAmount}>
            {valueProp} <Text style={styles.challengeSettingUnit}>{unit}</Text>
          </Text>
        </View>
        <View style={styles.slider}>
          <Slider
            value={valueProp}
            minimumValue={minValue}
            maximumValue={maxValue}
            step={1}
            onValueChange={(val: number | number[]) => onChange(val)}
            thumbStyle={styles.thumbStyle}
            trackStyle={styles.trackStyle}
          />
        </View>
      </View>
    </View>
  );
}

function makeStyles(theme: ReactNativePaper.Theme) {
  return StyleSheet.create({
    container: {
      marginLeft: 17,
      marginRight: 17,
      backgroundColor: 'white',
    },
    challengeSettingAmount: {
      fontSize: 30,
    },
    challengeSettingUnit: {
      fontSize: 16,
      color: theme.colors.graphic.black,
      opacity: 0.5,
    },
    InfoContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoText: {
      fontSize: 16,
      textAlign: 'center',
      color: theme.colors.graphic.black,
      opacity: 0.8,
    },
    slider: {
      width: '80%',
      alignItems: 'stretch',
      justifyContent: 'center',
    },
    thumbStyle: {
      backgroundColor: 'black',
    },
    trackStyle: {
      backgroundColor: 'gray',
    },
  });
}
