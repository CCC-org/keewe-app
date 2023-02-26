import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

interface MypageTitleProps {
  label: string;
  condition: string;
  date: string;
  titleId: number;
}

const getTitleImageById = {
  1000: require('../../../assets/images/titles/1000.png'),
  2000: require('../../../assets/images/titles/2000.png'),
  2001: require('../../../assets/images/titles/2001.png'),
  2002: require('../../../assets/images/titles/2002.png'),
  2003: require('../../../assets/images/titles/2003.png'),
  2004: require('../../../assets/images/titles/2004.png'),
  2005: require('../../../assets/images/titles/2005.png'),
  3000: require('../../../assets/images/titles/3000.png'),
  3001: require('../../../assets/images/titles/3001.png'),
  3002: require('../../../assets/images/titles/3002.png'),
  3003: require('../../../assets/images/titles/3003.png'),
  4000: require('../../../assets/images/titles/4000.png'),
  4001: require('../../../assets/images/titles/4001.png'),
  4002: require('../../../assets/images/titles/4002.png'),
  5000: require('../../../assets/images/titles/5000.png'),
  5001: require('../../../assets/images/titles/5001.png'),
  5002: require('../../../assets/images/titles/5002.png'),
  5003: require('../../../assets/images/titles/5003.png'),
  6000: require('../../../assets/images/titles/6000.png'),
  7000: require('../../../assets/images/titles/7000.png'),
  7001: require('../../../assets/images/titles/7001.png'),
  8000: require('../../../assets/images/titles/8000.png'),
  8001: require('../../../assets/images/titles/8001.png'),
  9000: require('../../../assets/images/titles/9000.png'),
};

const MypageTitle = ({ label, condition, date, titleId }: MypageTitleProps) => {
  const theme = useTheme();
  // const imageUrl = `../../../assets/images/titles/${titleId}.png`;
  return (
    <View style={styles.container}>
      <Image
        style={{
          width: 48,
          height: 48,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        source={getTitleImageById[titleId]}
      />
      <View style={{ marginLeft: 12 }}>
        <Text style={{ ...theme.fonts.text.body1.bold, color: theme.colors.graphic.black }}>
          {label}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{ ...theme.fonts.text.body2.regular, color: `${theme.colors.graphic.black}80` }}
          >
            {condition} ⋅{' '}
          </Text>
          <Text
            style={{ ...theme.fonts.text.caption1, color: theme.colors.brand.onprimary.container }}
          >
            {date}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MypageTitle;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 24,
  },
});
