import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import darkChevronRightSmallXml from '../../../constants/Icons/Chevrons/darkChevronRightSmallXml';
import theme from '../../../theme/light';
import { INTEREST_ICONS } from './constant';

interface CurrentChallengeProfileProps {
  name: string;
  challengeDescription?: string;
  interest: string;
  insightNumber: string;
  highlight?: boolean;
}

const CurrentChallengeProfile = ({
  name,
  challengeDescription,
  interest,
  insightNumber,
}: CurrentChallengeProfileProps) => {
  return (
    <View
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
          <Text style={{ fontFamily: 'pretendard', fontSize: 12, marginVertical: 4 }}>
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
              {interest}⋅
            </Text>
            <Text
              style={{
                fontFamily: 'pretendardSemiBold',
                fontSize: 12,
                color: `${theme.colors.graphic.black}50`,
              }}
            >
              인사이트 {insightNumber}개
            </Text>
          </View>
        </View>
      </View>
    </View>
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
