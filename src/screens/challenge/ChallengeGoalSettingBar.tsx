import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { Slider } from '@miblanchard/react-native-slider';

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
  const styles = makeStyles(themeProp, unit);

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
            minimumTrackTintColor={
              unit === '번' ? themeProp.colors.graphic.green : themeProp.colors.graphic.orange
            }
            thumbStyle={styles.thumb}
            trackStyle={styles.track}
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

function makeStyles(theme: ReactNativePaper.Theme, unit: string) {
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
      width: '105%',
      alignItems: 'stretch',
      justifyContent: 'center',
      position: 'relative',
    },
    thumb: {
      backgroundColor: unit === '번' ? theme.colors.graphic.green : theme.colors.graphic.orange,
      borderColor: theme.colors.graphic.white,
      borderRadius: 10,
      borderWidth: 5,
      height: 20,
      shadowColor: theme.colors.graphic.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.35,
      shadowRadius: 2,
      // android shadow
      elevation: 4,
      width: 20,
    },
    track: {
      backgroundColor: 'rgba(18,19,20,0.1)',
      borderRadius: 4,
      height: 10,
      shadowColor: theme.colors.graphic.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.15,
      shadowRadius: 1,
    },
    barInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      // 1px solid radius
      width: '105%',
      position: 'absolute',
      bottom: -10,
      fontSize: 14,
      opacity: 0.8,
    },
  });
}
