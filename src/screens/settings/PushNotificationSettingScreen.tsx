import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Switch, useTheme } from 'react-native-paper';

const PushNotificationSettingScreen = () => {
  const {
    fonts: { text },
  } = useTheme();
  return (
    <View>
      <View style={styles.settingTitle}>
        <Text style={[text.headline1, { height: 28 }]}> 챌린지</Text>
      </View>
      <View style={styles.settingOption}>
        <View>
          <Text style={[text.body1.regular]}>기록 리마인드</Text>
          <Text style={[text.body2.regular, { color: '#12131475' }]}>
            꾸준한 기록을 위해 아침 8시 30분에 알려드려요
          </Text>
        </View>
        <Switch />
      </View>
      <View style={styles.settingOption}>
        <View>
          <Text style={[text.body1.regular]}>인사이트 알림</Text>
          <Text style={[text.body2.regular, { color: '#12131475' }]}>
            챌린지에 새 인사이트가 올라왔을 때
          </Text>
        </View>
        <Switch />
      </View>
      <View style={[styles.settingTitle, { marginTop: 12 }]}>
        <Text style={[text.headline1, { height: 28 }]}>내 활동</Text>
      </View>
      <View style={styles.settingOption}>
        <View>
          <Text style={[text.body1.regular]}>활동 알림</Text>
          <Text style={[text.body2.regular, { color: '#12131475' }]}>
            내 인사이트에 대한 반응과 댓글
          </Text>
        </View>
        <Switch />
      </View>
    </View>
  );
};

export default PushNotificationSettingScreen;

const styles = StyleSheet.create({
  settingTitle: {
    height: 54,
    padding: 16,
    paddingTop: 24,
    backgroundColor: 'white',
  },
  settingOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingLeft: 24,
    backgroundColor: 'white',
  },
});
