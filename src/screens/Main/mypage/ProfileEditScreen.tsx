import { StyleSheet, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import HeaderRightButton from '../../../components/header/HeaderRightButton';
import { useTheme } from 'react-native-paper';
import ProfileList from './ProfileList';
import { TOTAL_TAG } from '../../../constants/Interests';
import TwoButtonModal from '../../../components/modal/TwoButtonModal';
import ProfileImage from './ProfileImage';

const ProfileEditScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState<boolean>(true);
  const hideModal = () => setModalVisible(false);
  const [btnAbled, setBtnAbled] = useState<boolean>(true);
  const [nickname, setNickname] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [introduction, setIntroduction] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [customCategory, setCustomCategory] = useState<string[]>([]);
  const handleComplete = () => alert('back!');
  const handleNickname = () => {
    navigation.navigate('NicknameEditing', {
      nickname,
      title,
      introduction,
      selectedCategory,
      toScreen: 'ProfileEdit',
    });
  };
  const handleTitle = () => alert('타이틀창으로');
  const handleIntroduction = () =>
    navigation.navigate('IntroductionEditing', {
      nickname,
      title,
      introduction,
      selectedCategory,
      toScreen: 'ProfileEdit',
    });
  const handleInterests = () =>
    navigation.navigate('InterestEditing', {
      nickname,
      title,
      introduction,
      selectedCategory,
      customCategory,
    });
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
          backGroundColor={
            btnAbled ? theme.colors.brand.primary.main : `${theme.colors.graphic.black}33`
          }
          textColor={btnAbled ? theme.colors.graphic.black : theme.colors.graphic.white}
          borderLine={false}
          disabled={!btnAbled}
          handlePress={() => handleComplete()}
        />
      ),
    });
  }, []);

  useEffect(() => {
    //const { nickname: a, title: b, introduction: c, selectedCategory: d } = route.params;
    //프로필 수정 api 나오면 btnAbled 논리 들어갈 예정
    setBtnAbled(true);
  }, [route]);

  useEffect(() => {
    const { nickname, title, introduction, selectedCategory } = route.params;
    setNickname(nickname);
    setTitle(title);
    setSelectedCategory(selectedCategory);
    setIntroduction(introduction);
    setCustomCategory(
      selectedCategory.filter((cur) => {
        return !TOTAL_TAG.includes(cur);
      }),
    );
  }, [route]);
  return (
    <>
      <TwoButtonModal
        dismissable={false}
        mainTitle={'수정한 내용을 저장할까요?'}
        visible={modalVisible}
        onDismiss={hideModal}
        leftButtonText={'취소'}
        rightButtonText={'저장'}
        leftButtonPress={() => setModalVisible(false)}
        rightButtonPress={() => setModalVisible(false)}
      />
      <ProfileImage />
      <View>
        <ProfileList title="이름" content={nickname} handlePress={handleNickname} />
        <ProfileList title="대표 타이틀" content={title} handlePress={handleTitle} />
        <ProfileList
          title="소개"
          content={introduction === '' ? '자신을 자유롭게 표현해보세요' : introduction}
          contentColor={introduction === '' ? `${theme.colors.graphic.black}4d` : undefined}
          handlePress={handleIntroduction}
          height={60}
        />
        <ProfileList
          title="관심사"
          content={selectedCategory.map((cur) => '#' + cur).join(' ')}
          handlePress={handleInterests}
        />
      </View>
    </>
  );
};

export default ProfileEditScreen;

const styles = StyleSheet.create({});
