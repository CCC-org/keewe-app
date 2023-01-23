import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import theme from '../../theme/light';
import ProfileAvatar from './ProfileAvatar';
import InterestItem from './InterestItem';
import { getTimeInterval } from '../../utils/string/timeInterval';
import { Interest } from '../../types/insight/profile';
import { UseMutationResult } from '@tanstack/react-query';

interface ProfileProps {
  nickname: string;
  title: string;
  self: boolean;
  follow?: boolean;
  interests: Interest[];
  createdAt: string;
  image?: string;
  style?: ViewStyle;
  followMutation?: any;
}

const Profile = ({
  nickname,
  title,
  follow,
  self,
  interests,
  createdAt,
  image,
  style,
  followMutation,
}: ProfileProps) => {
  console.log('🚀 ~ file: Profile.tsx:41 ~ follow', follow);
  const theme = useTheme();

  return (
    <View style={style}>
      <View style={styles.Header}>
        <View style={styles.Profile}>
          <ProfileAvatar image={image} />
          <View style={styles.Description}>
            <Text style={theme.fonts.text.body2.bold}>{nickname}</Text>
            <Text
              style={{ ...theme.fonts.text.caption1, color: `${theme.colors.graphic.black}50` }}
            >
              {title} ∙ {getTimeInterval(new Date().getTime() - new Date(createdAt).getTime())}
            </Text>
          </View>
        </View>
        <View>
          {self ? undefined : (
            <Pressable
              onPress={() => {
                followMutation?.mutate();
              }}
              style={follow ? styles.Follow : styles.Following}
            >
              <Text
                style={{
                  ...theme.fonts.text.body2.bold,
                  color: follow ? theme.colors.graphic.white : theme.colors.graphic.black,
                }}
              >
                {follow ? '팔로잉' : '팔로우'}
              </Text>
            </Pressable>
          )}
        </View>
      </View>
      <View style={styles.Interest}>
        {interests.map((item, idx) => (
          <InterestItem key={idx} interest={item.name} />
        ))}
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  Header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
  },
  Profile: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  Description: {
    display: 'flex',
    marginLeft: 8,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  Follow: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 8,
    paddingTop: 8,
    borderRadius: 100,
    backgroundColor: theme.colors.graphic.black,
    color: theme.colors.graphic.white,
  },
  Following: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 8,
    paddingTop: 8,
    borderRadius: 100,
    borderColor: `${theme.colors.graphic.black}10`,
    borderWidth: 1,
  },
  Interest: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginTop: 16,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    flexWrap: 'wrap',
  },
});
