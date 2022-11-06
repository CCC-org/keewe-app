import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';

interface FeedVerticalDotsProps {
  onPress?: () => void;
}

const FeedVerticalDots = ({ onPress }: FeedVerticalDotsProps) => {
  return (
    <Pressable onPress={onPress}>
      <Feather name="more-vertical" size={24} color="black" />
    </Pressable>
  );
};

export default FeedVerticalDots;

const styles = StyleSheet.create({});
