import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import personXml from '../../constants/Icons/Avatar/personXml';
import { SvgXml } from 'react-native-svg';

interface StatisticsLinkInfoProps {
  title?: string;
  content?: string;
}

const StatisticsLinkInfo = ({ title, content }: StatisticsLinkInfoProps) => {
  const theme = useTheme();

  return (
    <View style={styles.linkInfo}>
      <SvgXml xml={personXml} width={36} height={36} style={{ marginRight: 0 }} />

      <View style={styles.linkTextInfo}>
        <Text style={[theme.fonts.text.caption1, { fontSize: 14 }]}>
          웹소설 웹툰의 어휘가 갈수록 단순하고 유채힞는 이유
        </Text>
        <Text style={[theme.fonts.text.caption1, { color: '#12131470' }]}>careerly.co.kr</Text>
      </View>
    </View>
  );
};

export default StatisticsLinkInfo;

const styles = StyleSheet.create({
  linkInfo: {
    flexDirection: 'row',
  },
  linkTextInfo: {
    flexDirection: 'column',
  },
});
