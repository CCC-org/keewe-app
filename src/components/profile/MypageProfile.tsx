import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ProfileAvatar from './ProfileAvatar';
import { useTheme } from 'react-native-paper';

interface MypageProfileProps {
  nickname: string;
  title: string;
}

const MypageProfile = ({ nickname, title }: MypageProfileProps) => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <ProfileAvatar size={84} />
      <View style={{ marginLeft: 12 }}>
        <Text style={{ ...theme.fonts.text.headline1, color: `${theme.colors.graphic.black}cc` }}>
          {nickname}
        </Text>
        <Text
          style={{
            ...theme.fonts.text.body2.bold,
            color: `${theme.colors.graphic.black}80`,
            marginTop: 4,
          }}
        >
          {title}
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          <Text
            style={{ ...theme.fonts.text.body1.regular, color: `${theme.colors.graphic.black}cc` }}
          >
            팔로워
          </Text>
          <Text style={{ ...theme.fonts.text.body1.bold, color: theme.colors.graphic.black }}>
            {' '}
            123{' '}
          </Text>
          <Text
            style={{ ...theme.fonts.text.body1.regular, color: `${theme.colors.graphic.black}cc` }}
          >
            {' '}
            팔로잉{' '}
          </Text>
          <Text style={{ ...theme.fonts.text.body1.bold, color: theme.colors.graphic.black }}>
            50K
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MypageProfile;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
