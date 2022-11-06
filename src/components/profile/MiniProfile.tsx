import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import ProfileAvatar from '../../components/profile/ProfileAvatar';
import { useTheme } from 'react-native-paper';

interface MiniProfileProps {
  nickname: string;
  title: string;
  createdAt?: string;
  image?: string;
  style?: ViewStyle;
}

const MiniProfile = ({ nickname, title, createdAt, image, ...props }: MiniProfileProps) => {
  const theme = useTheme();
  return (
    <View style={[styles.Profile, props.style]}>
      <ProfileAvatar image={image} />
      <View style={styles.Description}>
        <Text style={{ fontWeight: '600', fontSize: 14 }}>{nickname}</Text>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 12,
            color: `${theme.colors.graphic.black}80`,
            paddingTop: 5,
          }}
        >
          {title} ∙ {createdAt}
        </Text>
      </View>
    </View>
  );
};

export default MiniProfile;

const styles = StyleSheet.create({
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
});
