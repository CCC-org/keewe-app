import { Pressable, ScrollView, StyleSheet, Text, Linking, NativeModules } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from 'react-native-paper';
import DividerBar from '../../components/bars/DividerBar';
import TwoButtonModal from '../../components/modal/TwoButtonModal';
import MultiTapButton from '../../components/buttons/MultipleTapButton';
import { clearStorage } from '../../utils/hooks/asyncStorage/Logout';
import { LoginAPI } from '../../utils/api/LoginAPI';
import { useMutation } from '@tanstack/react-query';
import * as Updates from 'expo-updates';
import { CommonActions } from '@react-navigation/native';

const SettingsScreen = ({ navigation }) => {
  const theme = useTheme();

  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isWithdrawalModalVisible, setIsWithdrawalModalVisible] = useState(false);

  const { mutate: withdraw } = useMutation(LoginAPI.withdraw, {
    onSuccess: () => {
      clearStorage();
      setIsWithdrawalModalVisible(false);
      NativeModules.DevSettings.reload();
    },
  });

  const handleLogOut = () => {
    setIsLogoutModalVisible(false);
    clearStorage().then(() => {
      // Updates moudle is not working on dev mode.
      Updates.reloadAsync();
      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 0,
      //     routes: [{ name: 'Login' }], // Replace 'Root' with the name of your initial route
      //   }),
      // );
    });
  };

  const handleWithdrawal = () => {
    withdraw();
  };

  const handleNoticePress = () => {
    Linking.openURL('https://keewe2023.notion.site/a0395d1a23bf413ea60b7402ac6b4c03');
  };

  const handleCustomerServicePress = () => {
    Linking.openURL('https://pf.kakao.com/_xjZxfnxj');
  };

  const handlePrivacyPolicyPress = () => {
    Linking.openURL('https://keewe2023.notion.site/Keewe-32099697963a4681a5afe70000b0217a');
  };

  const handleTermsOfServicePress = () => {
    Linking.openURL('https://keewe2023.notion.site/Keewe-e2f9aa19867943cf979c7caefa247915');
  };

  const handleNavToRootPage = () => {
    navigation.navigate('Root');
  };

  return (
    <>
      <ScrollView>
        <Pressable onPress={() => navigation.navigate('FolderEdit')} style={styles.settingOption}>
          <Text style={theme.fonts.text.body1.regular}>폴더 편집</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Block')} style={styles.settingOption}>
          <Text style={theme.fonts.text.body1.regular}>차단한 계정</Text>
        </Pressable>
        <DividerBar style={styles.divider} />
        <Pressable onPress={handleNoticePress} style={styles.settingOption}>
          <Text style={theme.fonts.text.body1.regular}>공지사항</Text>
        </Pressable>
        <Pressable onPress={handleCustomerServicePress} style={styles.settingOption}>
          <Text style={theme.fonts.text.body1.regular}>고객센터</Text>
        </Pressable>
        <Pressable onPress={handlePrivacyPolicyPress} style={styles.settingOption}>
          <Text style={theme.fonts.text.body1.regular}>개인정보처리방침</Text>
        </Pressable>
        <Pressable onPress={handleTermsOfServicePress} style={styles.settingOption}>
          <Text style={theme.fonts.text.body1.regular}>이용약관</Text>
        </Pressable>

        <MultiTapButton
          style={styles.settingOption}
          onMultiTap={handleNavToRootPage}
          requiredTaps={5}
          timeLimit={2000}
        >
          <Text style={theme.fonts.text.body1.regular}>버전</Text>
          <Text style={[theme.fonts.text.body1.regular, { color: '#486006' }]}>1.0.0</Text>
        </MultiTapButton>
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
