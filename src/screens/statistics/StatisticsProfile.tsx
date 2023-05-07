import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
import personXml from '../../constants/Icons/Avatar/personXml';
import { useTheme } from 'react-native-paper';

interface StatisticProfileProps {
  name: string;
  date?: string;
}

const StatisticsProfile = ({ name, date }: StatisticProfileProps) => {
  const theme = useTheme();
  return (
    <View style={styles.profileInfo}>
      <SvgXml xml={personXml} width={24} height={24} />
      <Text style={[theme.fonts.text.body2.bold, { marginLeft: 8, marginRight: 8 }]}>
        meanjeong
      </Text>
      <Text
        style={{
          top: -2,
        }}
      >
        .
      </Text>
      <Text
        style={[
          theme.fonts.text.caption1,
          { fontSize: 14, marginLeft: 4, color: '#12131460', top: 1 },
        ]}
      >
        2021.04.12
      </Text>
    </View>
  );
};

export default StatisticsProfile;

const styles = StyleSheet.create({
  profileInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 12,
  },
});
