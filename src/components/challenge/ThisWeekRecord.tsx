import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

interface ThisWeekRecordProps {
  current: number;
  goal?: number;
}

const ThisWeekRecord = ({ current, goal }: ThisWeekRecordProps) => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Text style={{ ...theme.fonts.text.body1.regular, color: `${theme.colors.graphic.black}cc` }}>
        이번 주 기록
      </Text>
      <Text
        style={{
          ...theme.fonts.text.podkova.bold,
          color: theme.colors.graphic.orange,
          marginLeft: 10,
        }}
      >
        {current}
      </Text>
      <Text
        style={{
          ...theme.fonts.text.body2.regular,
          color: `${theme.colors.graphic.black}80`,
          paddingTop: 2,
          marginLeft: 3,
        }}
      >
        /
      </Text>
      <Text
        style={{
          ...theme.fonts.text.podkova.bold,
          color: `${theme.colors.graphic.black}cc`,
          marginLeft: 3,
        }}
      >
        {goal} 회
      </Text>
    </View>
  );
};

export default ThisWeekRecord;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 2,
    flexDirection: 'row',
  },
});
