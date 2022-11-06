import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
interface FeedBookMarkIconProps {
  onPress?: () => void;
  isMarked?: boolean;
}

const FeedBookMarkIcon = ({ onPress, isMarked = false }: FeedBookMarkIconProps) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.circle}>
        {isMarked ? (
          <FontAwesome name="bookmark" size={20} color="black" />
        ) : (
          <FontAwesome name="bookmark-o" size={20} color="black" />
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
