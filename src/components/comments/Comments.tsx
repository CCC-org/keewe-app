import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MiniProfile from '../profile/MiniProfile';
import { useTheme } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';

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
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <MiniProfile nickname={nickname} title={title} />
        <Pressable>
          <Entypo name="dots-three-vertical" size={20} color="black" />
        </Pressable>
      </View>
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
    marginTop: 14,
    marginHorizontal: 16,
  },
  content: {
    marginLeft: 48,
    paddingTop: 6,
  },
});
