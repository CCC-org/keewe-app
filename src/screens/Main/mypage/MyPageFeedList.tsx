import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface Props {
  id: number;
  userId: number;
}

const MyPageFeedList = ({ id, userId }: Props) => {
  return (
    <View>
      <Text>userId: {userId}</Text>
      <Text>id: {id}</Text>
    </View>
  );
};

export default MyPageFeedList;

const styles = StyleSheet.create({});
