import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../../theme/light';
import ProfileAvatar from './ProfileAvatar';

interface ChallengeUserProfileProps {
  nickname: string;
  imageURL: string;
  currentRecord: number;
  goalRecord: number;
  following: boolean;
}

const ChallengeUserProfile = ({
  nickname,
  imageURL,
  currentRecord,
  goalRecord,
  following,
}: ChallengeUserProfileProps) => {
  return (
    <View style={styles.mainContainer}>
      <ProfileAvatar size={48} image={imageURL} />
      <View style={styles.description}>
        <View style={styles.name}>
          <Text style={{ fontFamily: 'pretendardSemiBold', fontSize: 16 }}>{nickname}</Text>
          {following && (
            <View
              style={{
                ...styles.following,
                backgroundColor: theme.colors.brand.surface.container1,
              }}
            >
              <Text
                style={{
                  marginVertical: 4,
                  marginHorizontal: 8,
                  fontFamily: 'pretendardMedium',
                  fontSize: 12,
                  color: theme.colors.brand.onprimary.container,
                }}
              >
                팔로잉
              </Text>
            </View>
          )}
        </View>
        <Text
          style={{
            fontFamily: 'pretendardSemiBold',
            fontSize: 14,
            color: theme.colors.brand.onprimary.container,
            marginTop: 2,
          }}
        >{`${currentRecord}/${goalRecord}번째 기록중`}</Text>
      </View>
    </View>
  );
};

export default ChallengeUserProfile;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  description: {
    marginLeft: 12,
  },
  name: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  following: { marginLeft: 4, borderRadius: 20 },
});
