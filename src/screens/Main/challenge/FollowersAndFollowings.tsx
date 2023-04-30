import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
import person from '../../../constants/Icons/Avatar/personXml';
import { useTheme } from 'react-native-paper';

interface User {
  id: number;
  nickname: string;
  imageURL: string;
}

interface FollowersAndFollowingsProps {
  users: User[];
}

const FollowersAndFollowings = ({ users }: FollowersAndFollowingsProps) => {
  const theme = useTheme();
  return (
    <>
      {users.map((user) => (
        <View style={styles.container} key={user.id}>
          <View style={styles.userContainer}>
            <View
              style={{ ...styles.image, backgroundColor: theme.colors.brand.surface.container2 }}
            >
              <SvgXml xml={person} height={28} width={27} />
            </View>
            <Text style={theme.fonts.text.body1.bold}>{user.nickname}</Text>
          </View>
          <Pressable onPress={() => alert('Invite ' + user.nickname)}>
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
});
