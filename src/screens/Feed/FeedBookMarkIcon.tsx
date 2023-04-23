import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
import BookMarkOnXml from '../../constants/Icons/DetailedPost/BookMarkOnXml';
import BookMarkOffXml from '../../constants/Icons/DetailedPost/BookMarkOffXml';
import { useTheme } from 'react-native-paper';
interface FeedBookMarkIconProps {
  onPress?: () => void;
  isMarked?: boolean;
}

const FeedBookMarkIcon = ({ onPress, isMarked = false }: FeedBookMarkIconProps) => {
  const theme = useTheme();
  return (
    <Pressable onPress={onPress}>
      <View style={styles.circle}>
        {isMarked ? (
          <SvgXml xml={BookMarkOnXml} width={20} opacity={0.9} />
        ) : (
          <SvgXml xml={BookMarkOffXml} width={20} opacity={0.3} />
        )}
      </View>
    </Pressable>
  );
};

export default FeedBookMarkIcon;

const styles = StyleSheet.create({
  circle: {
    width: 34,
    height: 34,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 34,
  },
});
