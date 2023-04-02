import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import theme from '../../../theme/light';

interface StatisticIconProps {
  xml: string;
  count: number;
}

const StatisticIcon = ({ xml, count }: StatisticIconProps) => {
  return (
    <View style={styles.item}>
      <SvgXml xml={xml} />
      <Text
        style={{
          marginTop: 8,
          ...theme.fonts.text.podkova.bold,
        }}
      >
        {count}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: { justifyContent: 'center', alignItems: 'center' },
});

export default StatisticIcon;
