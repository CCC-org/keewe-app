import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import theme from '../../theme/light';
import { INTEREST_ICONS } from '../profile/constant';
import { useTheme } from 'react-native-paper';

interface ChallengeTitle {
  title: string;
  category: string;
  startDate: string;
  challengeIntroduction: string;
}

const ChallengeTitle = ({ title, category, startDate, challengeIntroduction }: ChallengeTitle) => {
  const theme = useTheme();
  return (
    <View>
      <View style={styles.container}>
        <View
          style={{
            ...styles.profile,
            backgroundColor: theme.colors.brand.primary.main,
            marginRight: 12,
          }}
        >
          <SvgXml xml={INTEREST_ICONS[category] ?? INTEREST_ICONS['기본']} />
        </View>
        <Text style={theme.fonts.text.headline1}>{title}</Text>
      </View>
      <Text style={theme.fonts.text.body2.bold}>{category}</Text>
      <Text
        style={{
          ...theme.fonts.text.body2.bold,
          color: theme.colors.brand.onprimary.container,
        }}
      >
        {startDate} 생성됨
      </Text>

      <Text style={{ ...theme.fonts.text.body2.regular, marginTop: 12 }}>
        {challengeIntroduction}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profile: {
    height: 48,
    width: 48,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  texts: {
    justifyContent: 'space-between',
  },
  title: {
    flexDirection: 'row',
  },
});

export default ChallengeTitle;
