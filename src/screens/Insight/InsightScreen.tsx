import { Pressable, StyleSheet, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import Profile from '../../components/profile/Profile';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const InsightScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={styles.headerRight}>
            <Pressable onPress={() => alert('bookmark')}>
              <Feather name="bookmark" size={24} color="black" />
            </Pressable>
            <Pressable onPress={() => alert('share')}>
              <Feather name="share" size={24} color="black" />
            </Pressable>
            <Pressable onPress={() => alert('three dots')}>
              <Entypo name="dots-three-vertical" size={24} color="black" />
            </Pressable>
          </View>
        );
      },
    });
  });
  return (
    <>
      <Profile
        nickname="nickname"
        title="title"
        self={false}
        follow={true}
        interests={[
          {
            name: 'interest',
          },
          {
            name: 'interest',
          },
          {
            name: 'interest',
          },
          {
            name: 'interest',
          },
          {
            name: 'interest',
          },
          {
            name: 'interest',
          },
        ]}
        createdAt="createdAt"
      />
      {/* Insight text, link card, emoticons, etc.. */}
      {/* reply etc.. */}
    </>
  );
};

export default InsightScreen;

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 100,
    marginRight: 20,
  },
});
