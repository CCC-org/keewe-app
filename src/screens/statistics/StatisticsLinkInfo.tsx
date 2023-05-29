import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { LinkPreview } from '@flyerhq/react-native-link-preview';

interface StatisticsLinkInfoProps {
  title?: string;
  content?: string;
}

const StatisticsLinkInfo = ({ title, content }: StatisticsLinkInfoProps) => {
  const theme = useTheme();
  return (
    <LinkPreview
      text={content ?? ''}
      renderLinkPreview={(pre) => {
        const url = pre.previewData?.image?.url;
        return (
          <View style={styles.linkInfo}>
            <Image style={styles.imageContainer} source={{ uri: url }} />
            <View style={styles.linkTextInfo}>
              <Text style={[theme.fonts.text.caption1, { fontSize: 14 }]}>
                {title ? title.slice(0, 40) + (title.length > 40 ? '...' : '') : 'No title'}
              </Text>
              <Text numberOfLines={1} style={[theme.fonts.text.caption1, { color: '#12131470' }]}>
                {content}
              </Text>
            </View>
          </View>
        );
      }}
    />
  );
};

export default StatisticsLinkInfo;

const styles = StyleSheet.create({
  linkInfo: {
    flexDirection: 'row',
  },
  linkTextInfo: {
    width: '90%',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  imageContainer: { width: 36, height: 36, borderRadius: 8, marginRight: 8 },
});
