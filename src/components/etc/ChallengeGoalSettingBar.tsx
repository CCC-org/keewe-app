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
          <Text style={styles.challengeSettingAmount}>{valueProp}</Text>
          <Text style={styles.challengeSettingUnit}>{unit}</Text>
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
        <View style={styles.barInfo}>
          <Text>
            {minValue}
            {unit}
          </Text>
          <Text>
            {maxValue}
            {unit}
          </Text>
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
      height: 150,
    },
    challengeSettingAmount: {
      fontSize: 30,
    },
    challengeSettingUnit: {
      fontSize: 16,
      opacity: 0.5,
      color: theme.colors.graphic.black,
      position: 'absolute',
      left: 20,
      top: 9,
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
      position: 'relative',
    },
    thumbStyle: {
      backgroundColor: 'black',
    },
    trackStyle: {
      backgroundColor: 'gray',
    },
    barInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      // 1px solid radius
      width: '80%',
      position: 'absolute',
      bottom: -10,
      fontSize: 14,
      opacity: 0.8,
    },
  });
}
