import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MiniProfile from '../../components/profile/MiniProfile';
import { useTheme } from 'react-native-paper';

interface RepresentativeCommentsSectionProps {
  nickname: string;
  title: string;
  content: string;
  total: number | string;
  createdAt?: string;
  image?: string;
}

const RepresentativeCommentsSection = ({
  nickname,
  title,
  content,
  total,
  createdAt,
  image,
}: RepresentativeCommentsSectionProps) => {
  const theme = useTheme();
  return (
    <View>
      <View style={styles.header}>
        <Text style={{ fontWeight: '600', fontSize: 18, color: theme.colors.graphic.black }}>
          댓글{' '}
        </Text>
        <Text style={{ fontWeight: '600', fontSize: 18, color: `${theme.colors.graphic.black}4d` }}>
          {total}
        </Text>
      </View>
      <View style={styles.bottom}>
        <MiniProfile nickname={nickname} title={title} />
        <View style={styles.content}>
          <Text
            style={{ fontWeight: '400', fontSize: 14, color: `${theme.colors.graphic.black}cc` }}
          >
            {content}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RepresentativeCommentsSection;

const styles = StyleSheet.create({
  header: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  bottom: {
    marginTop: 20,
    marginHorizontal: 16,
  },
  content: {
    marginLeft: 44,
    paddingTop: 6,
  },
});
