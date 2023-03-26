import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from 'react-native-paper';
import DividerBar from '../../components/bars/DividerBar';
import TwoButtonModal from '../../components/modal/TwoButtonModal';

const SettingsScreen = ({ navigation }) => {
  const theme = useTheme();

  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isWithdrawalModalVisible, setIsWithdrawalModalVisible] = useState(false);

  const handleLogOut = () => {
    alert('또 보시겠다능');
    setIsLogoutModalVisible(false);
  };

  const handleWithdrawal = () => {
    alert('잘가시라능..');
    setIsWithdrawalModalVisible(false);
  };

  return (
    <>
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
        <Pressable onPress={() => navigation.navigate('Block')} style={styles.settingOption}>
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
        <Pressable onPress={() => setIsLogoutModalVisible(true)} style={styles.settingOption}>
          <Text style={theme.fonts.text.body1.regular}>로그아웃</Text>
        </Pressable>
        <Pressable onPress={() => setIsWithdrawalModalVisible(true)} style={styles.settingOption}>
          <Text style={theme.fonts.text.body1.regular}>탈퇴하기</Text>
        </Pressable>
      </ScrollView>
      <TwoButtonModal
        dismissable={true}
        visible={isLogoutModalVisible}
        onDismiss={() => setIsLogoutModalVisible(false)}
        mainTitle="로그아웃 하시겠습니까?"
        leftButtonText="취소"
        rightButtonText="확인"
        leftButtonPress={() => setIsLogoutModalVisible(false)}
        rightButtonPress={handleLogOut}
      />
      <TwoButtonModal
        dismissable={true}
        visible={isWithdrawalModalVisible}
        onDismiss={() => setIsWithdrawalModalVisible(false)}
        mainTitle="탈퇴하시겠습니까?"
        leftButtonText="취소"
        rightButtonText="확인"
        leftButtonPress={() => setIsWithdrawalModalVisible(false)}
        rightButtonPress={handleWithdrawal}
      />
    </>
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
