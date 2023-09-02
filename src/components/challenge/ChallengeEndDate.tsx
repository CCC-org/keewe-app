import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

interface ChallengeEndDateProps {
  endDate?: string;
}

const ChallengeEndDate = ({ endDate }: ChallengeEndDateProps) => {
  const theme = useTheme();
  const parts = endDate ? endDate.split('-') : '';
  const convertedEndDate = parts.length === 3 ? `${parts[0]}.${parts[1]}.${parts[2]}` : endDate;
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
      <Text style={theme.fonts.text.podkova.bold}>{convertedEndDate}</Text>
    </View>
  );
};

export default ChallengeEndDate;

const styles = StyleSheet.create({
  endDate: {
    marginVertical: 2,
    alignItems: 'center',
  },
});
