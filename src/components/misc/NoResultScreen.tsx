import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const NoResultScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/emptybox.png')}
        style={{
          width: 160,
          height: 160,
          marginTop: 100,
        }}
      />
      <Text
        style={{
          color: 'rgba(18, 19, 20, 0.50))',
        }}
      >
        검색 결과가 없어요.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f8f8f4',
  },
});

export default NoResultScreen;
