import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import SmallPersonXml from '../../../constants/Icons/Avatar/\bsmallPersonXml';
import darkChevronRightSmallXml from '../../../constants/Icons/Chevrons/darkChevronRightSmallXml';
import theme from '../../../theme/light';

interface ChallengeProfileProps {
  name: string;
  participatingUserNumber: number;
  interest: string;
  startDate: string;
  highlight: boolean;
}

const ChallengeProfile = ({
  name,
  participatingUserNumber,
  interest,
  startDate,
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
        <SvgXml xml={require(`../../../../assets/svgs/InterestsIcon/${interest}.svg`)} />
      </View>
      <View style={styles.description}>
        <View style={styles.texts}>
          <View style={styles.title}>
            <Text style={{ fontFamily: 'pretendardSemiBold', fontSize: 16, marginRight: 16 }}>
              {name}
            </Text>
            <SvgXml xml={SmallPersonXml} />
            <Text style={{ fontFamily: 'pretendard', fontSize: 14 }}>
              {participatingUserNumber}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'pretendardSemiBold',
              fontSize: 14,
              color: theme.colors.brand.onprimary.container,
            }}
          >
            {interest}⋅{startDate}
          </Text>
        </View>

        <SvgXml xml={darkChevronRightSmallXml} />
        {/* 옆으로가기 버튼  */}
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
    borderRadius: 50,
  },
  description: {
    justifyContent: 'space-between',
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
