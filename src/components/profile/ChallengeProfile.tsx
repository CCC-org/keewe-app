import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { SvgXml } from 'react-native-svg';
import SmallPersonXml from '../../constants/Icons/Avatar/smallPersonXml';
import theme from '../../theme/light';
import { navigate } from '../../utils/hooks/navigaton/navigator';
import { INTEREST_ICONS } from './constant';
import { useTheme } from 'react-native-paper';

interface ChallengeProfileProps {
  name: string;
  participatingUserNumber?: number;
  interest: string;
  Date?: string;
  highlight?: boolean;
  challengeId: number;
  participate?: boolean;
}

const ChallengeProfile = ({
  name,
  participatingUserNumber,
  interest,
  Date,
  highlight,
  challengeId,
  participate,
}: ChallengeProfileProps) => {
  const theme = useTheme();
  return (
    <Pressable
      onPress={() =>
        participate
          ? navigate('ChallengeDetail', { challengeId, challengeName: name, interest })
          : navigate('ChallengeParticipation', { challengeId, challengeName: name, interest })
      }
      style={styles.container}
    >
      <View
        style={{
          ...styles.profile,
          backgroundColor: highlight
            ? theme.colors.brand.primary.container
            : theme.colors.brand.surface.container1,
          marginRight: 10,
        }}
      >
        <SvgXml xml={INTEREST_ICONS[interest] ?? INTEREST_ICONS['기본']} />
      </View>
      <View style={styles.description}>
        <View style={styles.texts}>
          <View style={styles.title}>
            <Text
              style={{
                ...theme.fonts.text.body1.bold,
                marginRight: 8,
              }}
            >
              {name}
            </Text>
            {participatingUserNumber !== undefined && (
              <>
                <SvgXml xml={SmallPersonXml} />
                <Text
                  style={{
                    ...theme.fonts.text.body2.regular,
                    color: `${theme.colors.graphic.black}b3`,
                    marginLeft: 2,
                  }}
                >
                  {participatingUserNumber}
                </Text>
              </>
            )}
          </View>
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
                color: theme.colors.brand.onprimary.container,
              }}
            >
              {' ' + Date}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
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
    alignItems: 'center',
    marginBottom: 4,
  },
});

export default ChallengeProfile;
