import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ProfileAvatar from './ProfileAvatar';
import { useTheme } from 'react-native-paper';

const MypageProfile = () => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <ProfileAvatar size={84} />
      <View style={{ marginLeft: 12 }}>
        <Text style={{ ...theme.fonts.text.headline1, color: '#121314cc' }}>닉네임</Text>
        <Text style={{ ...theme.fonts.text.body2.bold, color: '#12131480', marginTop: 4 }}>
          타이틀
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          <Text style={{ ...theme.fonts.text.body1.regular, color: '#121314cc' }}>팔로워</Text>
          <Text style={{ ...theme.fonts.text.body1.bold, color: '#121314' }}> 123 </Text>
          <Text style={{ ...theme.fonts.text.body1.regular, color: '#121314cc' }}> 팔로잉 </Text>
          <Text style={{ ...theme.fonts.text.body1.bold, color: '#121314' }}>50K</Text>
        </View>
      </View>
    </View>
  );
};

export default MypageProfile;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
