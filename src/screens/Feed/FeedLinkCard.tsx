import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
interface FeedLinkCardProps {
  link: string;
}
const FeedLinkCard = ({ link }: FeedLinkCardProps) => {
  return (
    <View>
      <Text>FeedLinkCard</Text>
    </View>
  );
};

export default FeedLinkCard;

const styles = StyleSheet.create({});
