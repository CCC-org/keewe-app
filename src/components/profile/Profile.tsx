import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { FontText } from '../texts/StyledText';
import theme from '../../theme/light';
import ProfileAvatar from './ProfileAvatar';
import InterestItem from './InterestItem';

interface ProfileProps {
  nickname: string;
  title: string;
  self: boolean;
  follow?: boolean;
  interests: Record<string, string>[];
  createdAt: string;
  image?: string;
}

const Profile = ({ nickname, title, follow, self, interests, createdAt, image }: ProfileProps) => {
  const theme = useTheme();
  return (
    <View style={{ width: '100%' }}>
      <View style={styles.Header}>
        <View style={styles.Profile}>
          <ProfileAvatar image={image} />
          <View style={styles.Description}>
            <FontText style={{ fontWeight: '600', fontSize: 14 }}>{nickname}</FontText>
            <FontText style={{ fontWeight: '600', fontSize: 12 }}>{title} ∙</FontText>
          </View>
        </View>
        <View>
          {self ? undefined : (
            <View style={follow ? styles.Follow : styles.Following}>
              <FontText
                style={{
                  color: follow ? theme.colors.graphic.white : theme.colors.graphic.black,
                }}
              >
                {follow ? '팔로우' : '팔로잉'}
              </FontText>
            </View>
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
    marginTop: 16,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    flexWrap: 'wrap',
  },
});