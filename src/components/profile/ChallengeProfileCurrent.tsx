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
}

const CurrentChallengeProfile = ({
  name,
  challengeDescription,
  interest,
  insightNumber,
  challengeId,
}: CurrentChallengeProfileProps) => {
  return (
    <Pressable
      onPress={() =>
        navigate('ChallengeParticipation', { challengeId, challengeName: name, interest })
      }
      style={{
        ...styles.container,
        borderBottomWidth: 1,
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
        <SvgXml xml={INTEREST_ICONS[interest] ?? INTEREST_ICONS['사진']} />
      </View>
      <View style={styles.description}>
        <View style={styles.texts}>
          <View style={styles.title}>
            <Text style={{ fontFamily: 'pretendardSemiBold', fontSize: 16, marginRight: 16 }}>
              {name}
            </Text>
          </View>
          <Text
            numberOfLines={2}
            style={{ fontFamily: 'pretendard', height: 32, fontSize: 12, marginVertical: 4 }}
          >
            {challengeDescription}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontFamily: 'pretendardSemiBold',
                fontSize: 12,
                color: theme.colors.brand.onprimary.container,
              }}
            >
              {interest} ⋅
            </Text>
            <Text
              style={{
                fontFamily: 'pretendardMedium',
                fontSize: 12,
                color: `${theme.colors.graphic.black}50`,
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
