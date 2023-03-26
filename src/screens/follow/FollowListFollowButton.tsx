import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

interface Props {
  isFollowing: boolean;
  onPress: () => void;
}

export default function FollowListFollowButton({ isFollowing, onPress }: Props) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 24,
        backgroundColor: isFollowing ? 'white' : '#B0E817',
        zIndex: 0,
        borderWidth: 1,
        borderColor: isFollowing ? '#12131410' : '#B0E817',
      }}
    >
      <Text
        style={[
          theme.fonts.text.body1.bold,
          {
            color: isFollowing ? '#12131490' : '#121314',
            zIndex: 1,
          },
        ]}
      >
        {isFollowing ? '팔로잉' : '팔로우'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
