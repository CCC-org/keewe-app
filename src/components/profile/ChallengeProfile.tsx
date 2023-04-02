import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { SvgXml } from 'react-native-svg';
import SmallPersonXml from '../../constants/Icons/Avatar/smallPersonXml';
import theme from '../../theme/light';
import { navigate } from '../../utils/hooks/navigaton/navigator';
import { INTEREST_ICONS } from './constant';

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
                fontFamily: 'pretendardSemiBold',
                fontSize: 16,
                marginRight: 16,
                marginBottom: 4,
              }}
            >
              {name}
            </Text>
            {participatingUserNumber !== undefined && (
              <>
                <SvgXml xml={SmallPersonXml} />
                <Text style={{ fontFamily: 'pretendard', fontSize: 14 }}>
                  {participatingUserNumber}
                </Text>
              </>
            )}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontFamily: 'pretendardSemiBold',
                fontSize: 14,
                color: theme.colors.brand.onprimary.container,
              }}
            >
              {interest} ⋅
            </Text>
            <Text
              style={{
                fontFamily: 'pretendard',
                fontSize: 14,
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
  },
});

export default ChallengeProfile;
