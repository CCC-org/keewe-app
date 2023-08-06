import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../../theme/light';

interface FollowCountCardProps {
  count: number;
  title: string;
}

const FollowCountCard = ({ count, title }: FollowCountCardProps) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          justifyContent: 'flex-start',
          fontFamily: 'podkovaBold',
          fontSize: 30,
          opacity: count === 0 ? 0.3 : 1,
        }}
      >
        {count}
      </Text>
      <Text
        style={{
          ...theme.fonts.text.body2.bold,
          marginTop: 8,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default FollowCountCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'flex-start',
    marginHorizontal: 12,
  },
});
