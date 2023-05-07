import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';

interface Props {
  xml: string;
  count?: number;
}

const StatisticsReactionCountInfo = ({ xml, count }: Props) => {
  return (
    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <SvgXml xml={xml} />
      <Text style={{ fontSize: 18, color: '#121314' }}>{count ?? 999}</Text>
    </View>
  );
};

export default StatisticsReactionCountInfo;

const styles = StyleSheet.create({});
