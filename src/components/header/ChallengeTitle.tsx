import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
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
  const slicedTitle = title.length > 14 ? title.slice(0, 14) + '...' : title;

  return (
    <View>
      <View style={styles.container}>
        <Text style={theme.fonts.text.headline1}>{slicedTitle}</Text>
        <View
          style={{
            ...styles.profile,
            backgroundColor: theme.colors.brand.surface.container1,
          }}
        >
          <SvgXml xml={INTEREST_ICONS[category] ?? INTEREST_ICONS['기본']} />
        </View>
      </View>
      <Text style={{ ...theme.fonts.text.body2.regular, width: 280 }}>{challengeIntroduction}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profile: {
    height: 40,
    width: 40,
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
