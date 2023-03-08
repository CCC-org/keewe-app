import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import SmallPersonXml from '../../constants/Icons/Avatar/smallPersonXml';
import darkChevronRightSmallXml from '../../constants/Icons/Chevrons/darkChevronRightSmallXml';
import { SelectedIconXml } from '../../constants/InterestsIconXml';
import theme from '../../theme/light';
import { INTEREST_ICONS } from './constant';

interface ChallengeProfileProps {
  name: string;
  participatingUserNumber?: number;
  interest: string;
  Date?: string;
  highlight?: boolean;
}

const ChallengeProfile = ({
  name,
  participatingUserNumber,
  interest,
  Date,
  highlight,
}: ChallengeProfileProps) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.profile,
          backgroundColor: highlight
            ? theme.colors.brand.primary.container
            : theme.colors.brand.surface.container1,
          marginRight: 10,
        }}
      >
        <SvgXml xml={INTEREST_ICONS[interest] ?? INTEREST_ICONS['사진']} />
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
    </View>
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
