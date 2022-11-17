import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import MypageProfile from '../../components/profile/MypageProfile';
import { useTheme } from 'react-native-paper';

const MyPageScreen = () => {
  const theme = useTheme();
  return (
    <ScrollView>
      <View style={{ marginLeft: 16, marginBottom: 30 }}>
        <MypageProfile />
      </View>
      <View style={{ marginHorizontal: 16 }}>
        <Text style={{ ...theme.fonts.text.body2.regular, color: '#121314cc' }}>
          암더 코리안 탑클래스 힙합모범 노블레스 페뷸러스 터뷸렌스 고져스 벗 댕저러스 난 비트를
          비틀어 제껴버리는 셔브미션 챔피욘
        </Text>
      </View>
    </ScrollView>
  );
};

export default MyPageScreen;

const styles = StyleSheet.create({});
