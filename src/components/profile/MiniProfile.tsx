import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import ProfileAvatar from '../../components/profile/ProfileAvatar';
import { useTheme } from 'react-native-paper';
import { getTimeInterval } from '../../utils/string/timeInterval';

interface MiniProfileProps {
  nickname?: string;
  title?: string;
  insightWriter?: boolean;
  createdAt: string;
  image?: string;
  style?: ViewStyle;
}

const MiniProfile = ({
  nickname,
  title,
  insightWriter,
  createdAt,
  image,
  ...props
}: MiniProfileProps) => {
  const theme = useTheme();
  return (
    <View style={[styles.Profile, props.style]}>
      <ProfileAvatar image={image} />
      <View style={styles.Description}>
        <View style={{ flexDirection: 'row', alignContent: 'center' }}>
          <Text style={{ ...theme.fonts.text.body2.bold, marginRight: 4 }}>{nickname}</Text>
          {insightWriter ? (
            <Text
              style={{
                ...theme.fonts.text.caption1,
                color: theme.colors.brand.onprimary.container,
                marginTop: 2,
              }}
            >
              글쓴이
            </Text>
          ) : null}
        </View>
        <Text
          style={{
            ...theme.fonts.text.caption1,
            color: `${theme.colors.graphic.black}80`,
            paddingTop: 2,
          }}
        >
          {title} ∙ {getTimeInterval(new Date().getTime() - new Date(createdAt).getTime())}
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
