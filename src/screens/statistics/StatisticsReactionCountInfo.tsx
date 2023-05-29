import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
import theme from '../../theme/light';

interface Props {
  xml: string;
  count: number;
}

const StatisticsReactionCountInfo = ({ xml, count }: Props) => {
  return (
    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <SvgXml xml={xml} />
      <Text
        style={{
          fontSize: 18,
          color: theme.colors.graphic.black,
          opacity: count === 0 ? 0.3 : 1,
        }}
      >
        {count}
      </Text>
    </View>
  );
};

export default StatisticsReactionCountInfo;
