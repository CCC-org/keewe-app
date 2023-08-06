import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { SvgXml } from 'react-native-svg';
import theme from '../../theme/light';
import { navigate } from '../../utils/hooks/navigaton/navigator';
import { INTEREST_ICONS } from './constant';

interface CurrentChallengeProfileProps {
  name: string;
  challengeDescription?: string;
  interest: string;
  insightNumber: string;
  highlight?: boolean;
  challengeId: number;
  participate: boolean;
}

const CurrentChallengeProfile = ({
  name,
  challengeDescription,
  interest,
  insightNumber,
  challengeId,
  participate,
}: CurrentChallengeProfileProps) => {
  return (
    <Pressable
      onPress={() =>
        participate
          ? navigate('ChallengeDetail', { challengeId, challengeName: name, interest })
          : navigate('ChallengeParticipation', { challengeId, challengeName: name, interest })
      }
      style={{
        ...styles.container,
        borderColor: `${theme.colors.graphic.black}10`,
      }}
    >
      <View
        style={{
          ...styles.profile,
          backgroundColor: theme.colors.brand.surface.container1,
          marginRight: 10,
        }}
      >
        <SvgXml xml={INTEREST_ICONS[interest] ?? INTEREST_ICONS['기본']} />
      </View>
      <View style={styles.description}>
        <View style={styles.texts}>
          <View style={styles.title}>
            <Text style={{ ...theme.fonts.text.body1.bold, marginRight: 16 }}>{name}</Text>
          </View>
          <Text
            numberOfLines={2}
            style={{
              ...theme.fonts.text.body2.regular,
              marginTop: 2,
              marginBottom: 3,
            }}
          >
            {challengeDescription}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                ...theme.fonts.text.body2.bold,
                color: theme.colors.brand.onprimary.container,
              }}
            >
              {interest} ⋅
            </Text>
            <Text
              style={{
                ...theme.fonts.text.body2.regular,
                color: `${theme.colors.graphic.black}80`,
              }}
            >
              {' '}
              인사이트 {insightNumber}개
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    marginHorizontal: 16,
    flexDirection: 'row',
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

export default CurrentChallengeProfile;
