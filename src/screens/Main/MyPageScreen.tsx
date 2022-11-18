import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import React from 'react';
import MypageProfile from '../../components/profile/MypageProfile';
import { useTheme } from 'react-native-paper';
import { Feather, Ionicons } from '@expo/vector-icons';

const MyPageScreen = () => {
  const theme = useTheme();
  return (
    <ScrollView>
      <View style={styles.top}>
        <View style={styles.setting}>
          <Pressable onPress={() => alert('setting')}>
            <Ionicons name="settings-outline" size={24} color={`${theme.colors.graphic.black}cc`} />
          </Pressable>
          <Pressable onPress={() => alert('more')}>
            <Feather name="more-vertical" size={24} color={`${theme.colors.graphic.black}cc`} />
          </Pressable>
        </View>
        <View style={{ marginLeft: 16, marginBottom: 24 }}>
          <MypageProfile />
        </View>
        <View style={{ marginHorizontal: 16 }}>
          <Text
            style={{ ...theme.fonts.text.body2.regular, color: `${theme.colors.graphic.black}cc` }}
          >
            암더 코리안 탑클래스 힙합모범 노블레스 페뷸러스 터뷸렌스 고져스 벗 댕저러스 난 비트를
            비틀어 제껴버리는 셔브미션 챔피욘
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Pressable style={styles.editBtn} onPress={() => alert('Editing Profile!')}>
            <Text
              style={{ ...theme.fonts.text.body1.bold, color: `${theme.colors.graphic.black}cc` }}
            >
              프로필 수정
            </Text>
          </Pressable>
        </View>
      </View>
      <View></View>
    </ScrollView>
  );
};

export default MyPageScreen;

const styles = StyleSheet.create({
  top: {
    backgroundColor: '#F1F1E9',
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  editBtn: {
    backgroundColor: '#e1e1d0',
    marginVertical: 32,
    borderRadius: 12,
    width: 343,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
