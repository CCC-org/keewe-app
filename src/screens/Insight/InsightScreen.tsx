import { Pressable, StyleSheet, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Profile from '../../components/profile/Profile';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import { getAccessToken } from '../../utils/hooks/asyncStorage/Login';
import { ProfileData } from '../../types/profile/profile';
import { InsightAPI, InsightQueryKeys } from '../../utils/api/InsightAPI';
import { useQuery } from 'react-query';
import { querySuccessError } from '../../utils/helper/queryReponse/querySuccessError';

const InsightScreen = ({ navigation, route }) => {
  const { data, isLoading } = useQuery(
    InsightQueryKeys.getProfile({ insightId: 2 }),
    () => InsightAPI.getProfile({ insightId: 2 }),
    querySuccessError,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={styles.headerRight}>
            <Pressable onPress={() => alert('bookmark')}>
              <Feather name="bookmark" size={24} color="black" />
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Share')}>
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
      {isLoading ? null : (
        <Profile
          nickname={data.data.nickname}
          title={data.data.title}
          self={data.data.author}
          follow={data.data.following}
          interests={data.data.interests}
          createdAt={data.data.createdAt}
          image={data.data.image}
        />
      )}
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
