import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MiniProfile from '../profile/MiniProfile';
import { useTheme } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';

interface CommentsProps {
  nickname: string;
  title: string;
  content: string;
  createdAt: string;
  image?: string;
  insightWriter?: boolean;
  isReply?: boolean;
  onReply?: () => void;
}

const Comment = ({
  nickname,
  title,
  content,
  insightWriter,
  createdAt,
  image,
  isReply = false,
  onReply,
}: CommentsProps) => {
  const theme = useTheme();
  return (
    <View style={{ marginLeft: isReply ? 44 : 0, ...styles.container }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <MiniProfile
          nickname={nickname}
          title={title}
          insightWriter={insightWriter}
          createdAt={createdAt}
        />
        <Pressable>
          <Entypo name="dots-three-vertical" size={20} color="black" />
        </Pressable>
      </View>
      <View style={styles.content}>
        <Text style={{ fontWeight: '400', fontSize: 14, color: `${theme.colors.graphic.black}cc` }}>
          {content}
        </Text>
        {!isReply && (
          <Pressable onPress={onReply}>
            <View
              style={{ ...styles.button, backgroundColor: theme.colors.brand.surface.container1 }}
            >
              <Text style={theme.fonts.text.caption1}>답글쓰기</Text>
            </View>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    marginTop: 14,
    marginHorizontal: 16,
  },
  content: {
    marginLeft: 48,
    paddingTop: 6,
  },
  button: {
    width: 58,
    height: 24,
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 4,
    paddingLeft: 4,
    marginTop: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
});
