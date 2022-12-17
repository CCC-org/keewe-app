import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import HeaderRightButton from '../../../components/header/HeaderRightButton';
import { useTheme } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';
import person from '../../../constants/Icons/Avatar/personXml';
import ProfileList from './ProfileList';

const ProfileEditScreen = ({ navigation }) => {
  const theme = useTheme();
  const [nickname, setNickname] = useState('이름');
  const [title, setTitle] = useState('프로환승러');
  const [introduction, setIntroduction] = useState('');
  const [interest, setInterest] = useState(['여행', '운동']);
  const handleComplete = () => alert('back!');
  const handleNickname = () => navigation.navigate('NicknameEditing');
  const handleTitle = () => alert('타이틀창으로');
  const handleIntroduction = () => navigation.navigate('IntroductionEditing');
  const handleInterest = () => navigation.navigate('InterestChoose', { nickname });
  useEffect(() => {
    navigation.setOptions({
      headerTitle: '프로필 수정',
    });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton
          text="저장"
          backGroundColor={theme.colors.brand.primary.main}
          textColor={theme.colors.graphic.black}
          borderLine={false}
          disabled={false}
          handlePress={() => handleComplete()}
        />
      ),
    });
  }, []);
  return (
    <>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            width: 84,
            height: 84,
            borderRadius: 100,
            backgroundColor: theme.colors.brand.surface.container2,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 16,
            marginBottom: 24,
          }}
        >
          <SvgXml xml={person} height={60} width={60} />
        </View>
      </View>
      <View>
        <ProfileList title="이름" content={nickname} handlePress={handleNickname} />
        <ProfileList title="대표 타이틀" content={title} handlePress={handleTitle} />
        <ProfileList
          title="소개"
          content={introduction === '' ? '자신을 자유롭게 표현해보세요' : introduction}
          contentColor={introduction === '' ? `${theme.colors.graphic.black}4d` : undefined}
          handlePress={handleIntroduction}
        />
        <ProfileList title="관심사" content={interest.join(' ')} handlePress={handleInterest} />
      </View>
    </>
  );
};

export default ProfileEditScreen;

const styles = StyleSheet.create({});
