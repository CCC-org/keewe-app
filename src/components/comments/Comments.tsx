import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MiniProfile from '../profile/MiniProfile';
import { useTheme } from 'react-native-paper';

interface CommentsProps {
  nickname: string;
  title: string;
  content: string;
  createdAt?: string;
  image?: string;
}

const Comments = ({ nickname, title, content, createdAt, image }: CommentsProps) => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <MiniProfile nickname={nickname} title={title} />
      <View style={styles.content}>
        <Text style={{ fontWeight: '400', fontSize: 14, color: `${theme.colors.graphic.black}cc` }}>
          {content}
        </Text>
      </View>
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 16,
  },
  content: {
    marginLeft: 44,
    paddingTop: 6,
  },
});
