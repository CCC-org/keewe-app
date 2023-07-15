import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
import person from '../../../constants/Icons/Avatar/personXml';
import { useTheme } from 'react-native-paper';
import { User } from '../../../types/followerList/followersfollowings';
import { useMutation } from '@tanstack/react-query';
import { ChallengeAPI } from '../../../utils/api/ChallengeAPI';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

interface FollowersAndFollowingsProps {
  users: User[] | undefined;
  challengeId: number;
}

const FollowersAndFollowings = ({ users, challengeId }: FollowersAndFollowingsProps) => {
  const theme = useTheme();

  const { mutate: challengeInvite } = useMutation(ChallengeAPI.invite, {
    onSuccess: () => {
      Toast.show({ type: 'snackbar', text1: '초대 알림을 보냈어요.', position: 'bottom' });
    },
  });

  const handleInviteButtonPress = (user: User) => {
    challengeInvite({
      challengeId: challengeId,
      targetUserId: user.userId,
    });
  };

  if (!users || users.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={theme.fonts.text.body1.regular}>초대 가능 대상이 없습니다.</Text>
      </View>
    );
  }

  return (
    <>
      {users.map((user) => (
        <View style={styles.container} key={user.userId}>
          <View style={styles.userContainer}>
            <View
              style={{ ...styles.image, backgroundColor: theme.colors.brand.surface.container2 }}
            >
              {user?.imageURL ? (
                <Image
                  source={{ uri: user?.imageURL }}
                  style={{ width: 40, height: 40, borderRadius: 100 }}
                />
              ) : (
                <SvgXml xml={person} height={28} width={27} />
              )}
            </View>
            <Text style={theme.fonts.text.body1.bold}>{user.nickname}</Text>
          </View>
          <Pressable onPress={() => handleInviteButtonPress(user)}>
            <Text
              style={{
                ...theme.fonts.text.body1.regular,
                color: theme.colors.brand.onprimary.container,
              }}
            >
              초대하기
            </Text>
          </Pressable>
        </View>
      ))}
    </>
  );
};

export default FollowersAndFollowings;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    flexDirection: 'row',
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    marginVertical: 8,
  },
  empty: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
