import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

interface ThisWeekRecordProps {
  title: string;
  flexDirection: 'row' | 'column';
  current?: number;
  goal?: number;
}

const ThisWeekRecord = ({ title, current, goal, flexDirection }: ThisWeekRecordProps) => {
  const theme = useTheme();
  return (
    <View
      style={{
        ...styles.container,
        flexDirection: flexDirection,
        alignItems: flexDirection === 'row' ? 'flex-start' : 'center',
      }}
    >
      {flexDirection === 'row' ? (
        <Text
          style={{ ...theme.fonts.text.body1.regular, color: `${theme.colors.graphic.black}cc` }}
        >
          {title}
        </Text>
      ) : (
        <Text style={{ ...theme.fonts.text.caption1, color: `${theme.colors.graphic.black}cc` }}>
          {title}
        </Text>
      )}

      <View style={{ flexDirection: 'row', marginTop: flexDirection === 'row' ? 0 : 8 }}>
        <Text
          style={{
            ...theme.fonts.text.podkova.bold,
            color: theme.colors.graphic.orange,
            marginLeft: flexDirection === 'row' ? 10 : 0,
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
    </View>
  );
};

export default ThisWeekRecord;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 2,
  },
});
