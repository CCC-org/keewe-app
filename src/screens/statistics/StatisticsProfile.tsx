import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import ProfileAvatar from '../../components/profile/ProfileAvatar';
import { InsightAPI, InsightQueryKeys } from '../../utils/api/InsightAPI';
import { useQuery } from '@tanstack/react-query';
import { getTime } from '../../utils/helper/time/UtcTimeFormatGetter';

interface StatisticProfileProps {
  insightId: number;
  image?: string;
  date?: string;
}

const timeConverter = (s: string) => s.slice(0, s.indexOf('T')).replaceAll('-', '. ');

const StatisticsProfile = ({ insightId, image, date }: StatisticProfileProps) => {
  const theme = useTheme();

  const { data: profile, isLoading: isProfileLoading } = useQuery(
    InsightQueryKeys.getProfile({ insightId }),
    () => InsightAPI.getProfile({ insightId }),
  );

  return (
    <>
      {!isProfileLoading && (
        <View style={styles.profileInfo}>
          <ProfileAvatar image={profile?.data.image} />
          <Text style={[theme.fonts.text.body2.bold, { marginLeft: 8, marginRight: 8 }]}>
            {profile?.data.nickname}
          </Text>
          <Text
            style={{
              top: -2,
            }}
          >
            .
          </Text>
          <Text
            style={[
              theme.fonts.text.caption1,
              { fontSize: 14, marginLeft: 4, color: '#12131460', top: 1 },
            ]}
          >
            {timeConverter(profile?.data.createdAt ?? '')}
          </Text>
        </View>
      )}
    </>
  );
};

export default StatisticsProfile;

const styles = StyleSheet.create({
  profileInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 12,
  },
});
