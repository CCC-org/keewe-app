import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

interface ChallengeEndDateProps {
  endDate?: string;
}

const ChallengeEndDate = ({ endDate }: ChallengeEndDateProps) => {
  const theme = useTheme();
  return (
    <View style={styles.endDate}>
      <Text
        style={{
          ...theme.fonts.text.caption1,
          color: `${theme.colors.graphic.black}cc`,
          marginBottom: 8,
        }}
      >
        종료일
      </Text>
      <Text style={theme.fonts.text.podkova.bold}>{endDate}</Text>
    </View>
  );
};

export default ChallengeEndDate;

const styles = StyleSheet.create({
  endDate: {
    marginTop: 10,
    marginBottom: 2,
    alignItems: 'center',
  },
});
