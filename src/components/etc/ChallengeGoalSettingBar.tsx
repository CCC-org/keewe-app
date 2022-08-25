import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

export default function ChallengeGoalSettingBar() {
  const themeProp = useTheme();
  const styles = makeStyles(themeProp);

  return (
    <View style={styles.container}>
      <View style={styles.InfoContainer}>
        <Text style={styles.infoText}>챌린지에 몇 주 동안 참여할까요?</Text>
        <View>
          <Text style={styles.challengeSettingAmount}>
            2 <Text style={styles.challengeSettingUnit}>주</Text>
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
  });
}
