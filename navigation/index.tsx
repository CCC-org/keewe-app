import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, View } from 'react-native';
import { Text } from 'react-native-paper';

export function RootScreen() {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate('NicknameCreation')}>
      <View
        style={{
          backgroundColor: 'red',
          width: 100,
          height: 100,
        }}
      >
        <Text> Root Screen</Text>
      </View>
    </Pressable>
  );
}
