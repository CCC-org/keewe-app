import React from 'react';
import { Text, View, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import theme from '../../theme/light';

const ErrorScreen = ({ navigation, route }) => {
  const { error } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={{ fontFamily: 'pretendardSemiBold', marginBottom: 150 }}>
          {error.response.data.message}
        </Text>
      </View>
      <Pressable
        style={{ ...styles.bottomButton, backgroundColor: theme.colors.graphic.black }}
        onPress={() => {
          navigation.navigate('Feed');
        }}
      >
        <Text style={{ fontFamily: 'pretendardSemiBold', color: theme.colors.graphic.white }}>
          홈으로 돌아가기
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ErrorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 12,
    width: 343,
    height: 48,
    borderRadius: 12,
  },
});
