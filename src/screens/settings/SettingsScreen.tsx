import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import DividerBar from '../../components/bars/DividerBar';

const SettingsScreen = ({ navigation }) => {
  const theme = useTheme();
  return (
    <ScrollView>
      <View style={styles.settingOption}>
        <Text style={theme.fonts.text.body1.regular}>연결된 계정</Text>
        <Text style={[theme.fonts.text.body1.regular, { color: '#486006' }]}>
          한밤중에 목이말라 냉장고를 열어보니
        </Text>
      </View>
      <Pressable
        onPress={() => navigation.navigate('PushNotificationSetting')}
        style={styles.settingOption}
      >
        <Text style={theme.fonts.text.body1.regular}>푸쉬알림 설정</Text>
      </Pressable>
      <Pressable onPress={() => alert('What')} style={styles.settingOption}>
        <Text style={theme.fonts.text.body1.regular}>폴더 편집</Text>
      </Pressable>
      <Pressable onPress={() => alert('What')} style={styles.settingOption}>
        <Text style={theme.fonts.text.body1.regular}>차단한 계정</Text>
      </Pressable>
      <DividerBar style={styles.divider} />
      <Pressable onPress={() => alert('What')} style={styles.settingOption}>
        <Text style={theme.fonts.text.body1.regular}>공지사항</Text>
      </Pressable>
      <Pressable onPress={() => alert('What')} style={styles.settingOption}>
        <Text style={theme.fonts.text.body1.regular}>고객센터</Text>
      </Pressable>
      <Pressable onPress={() => alert('What')} style={styles.settingOption}>
        <Text style={theme.fonts.text.body1.regular}>이용약관</Text>
      </Pressable>
      <View style={styles.settingOption}>
        <Text style={theme.fonts.text.body1.regular}>버전</Text>
        <Text style={[theme.fonts.text.body1.regular, { color: '#486006' }]}>1.0.0</Text>
      </View>
      <DividerBar style={styles.divider} />
      <Pressable onPress={() => alert('What')} style={styles.settingOption}>
        <Text style={theme.fonts.text.body1.regular}>로그아웃</Text>
      </Pressable>
      <Pressable onPress={() => alert('What')} style={styles.settingOption}>
        <Text style={theme.fonts.text.body1.regular}>탈퇴하기</Text>
      </Pressable>
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  settingOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  divider: {
    backgroundColor: '#f8f8f4',
    borderBottomColor: '#f8f8f4',
    height: 12,
    width: '150%',
    marginLeft: 0,
    left: -50,
  },
});
