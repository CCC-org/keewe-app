import { Linking, SafeAreaView, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import HeaderRightButton from '../../../components/header/HeaderRightButton';
import { useTheme } from 'react-native-paper';
import ProfileList from './ProfileList';
import { TOTAL_TAG } from '../../../constants/Interests';
import TwoButtonModal from '../../../components/modal/TwoButtonModal';
import ProfileImage from './ProfileImage';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import BottomSheetOption from '../../../components/bottomsheet/BottomSheetOption';
import * as ImagePicker from 'expo-image-picker';
import { getAccessToken } from '../../../utils/hooks/asyncStorage/Login';
import axios from 'axios';
import mime from 'mime';
import { titleNameToId } from '../../../constants/title/titleData';
import { useQueryClient } from '@tanstack/react-query';

const ProfileEditScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [cameraPermissionModal, setCameraPermissionModal] = useState<boolean>(false);
  const [libraryPermissionModal, setLibraryPermissionModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const hideModal = () => setModalVisible(false);
  const hideCameraPermissionModal = () => setCameraPermissionModal(false);
  const hideLibraryPermissionModal = () => setLibraryPermissionModal(false);
  const hideDeleteModal = () => setDeleteModal(false);
  const [btnAbled, setBtnAbled] = useState<boolean>(true);
  const [nickname, setNickname] = useState<string>(route?.params?.nickname ?? '');
  const [title, setTitle] = useState<string>(route?.params?.title ?? '');
  const [repTitleId, setRepTitleId] = useState<number>(route?.params?.repTitleId);
  const [introduction, setIntroduction] = useState<string>(route?.params?.introduction ?? '');
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [customCategory, setCustomCategory] = useState<string[]>([]);
  const [image, setImage] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  const handleComplete = () => setModalVisible(true);
  const changeLibraryPermission = () => setLibraryPermissionModal(true);
  const changeCameraPermission = () => setCameraPermissionModal(true);
  const editObject = {
    nickname,
    image,
    title,
    repTitleId,
    introduction,
    selectedCategory,
    customCategory,
    userId,
    toScreen: 'ProfileEdit',
  };
  const handleNickname = () => {
    navigation.navigate('NicknameEditing', editObject);
  };

  const handleTitle = () =>
    navigation.navigate('Title', {
      ...editObject,
      userId,
      isEnteredByProfileEdit: true,
    });

  const handleIntroduction = () => navigation.navigate('IntroductionEditing', editObject);
  const handleInterests = () => navigation.navigate('InterestEditing', editObject);
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
    //btnAbled 논리
    setBtnAbled(true);
  }, [route]);

  useEffect(() => {
    const res = navigation.getState().routes.filter((route) => route.name === 'ProfileEdit')[0];
    const { nickname, image, title, introduction, selectedCategory, userId, repTitleId } =
      res.params;
    setUserId(userId);
    setNickname(nickname);
    setImage(image);
    setTitle(title);
    setRepTitleId(repTitleId);
    setSelectedCategory(selectedCategory);
    setIntroduction(introduction);
    setCustomCategory(
      selectedCategory.filter((cur) => {
        return !TOTAL_TAG.includes(cur);
      }),
    );
  }, [navigation, route.params]);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['30%', '30%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleDeletePress = () => {
    setDeleteModal(true);
    bottomSheetModalRef.current?.dismiss();
  };
  const handleLibraryPress = () => pickImage();
  const handleShotPress = () => openCamera();

  const pickImage = async () => {
    // BUG: Android에 권한 부여 원할하지 않음
    const permissionResult = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      changeLibraryPermission();
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    queryClient.invalidateQueries(['profile']);
    bottomSheetModalRef.current?.dismiss();
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.getCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      changeCameraPermission();
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    queryClient.invalidateQueries(['profile']);
    bottomSheetModalRef.current?.dismiss();
  };

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    [],
  );

  const queryClient = useQueryClient();

  const handleSaveProfileInfo = async () => {
    const formData = new FormData();
    if (image) {
      formData.append('profileImage', {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        uri: image,
        type: mime.getType(image),
        name: 'image.jpg',
      });
    }
    formData.append('nickname', nickname);
    for (const inter of selectedCategory) {
      formData.append('interests', inter);
    }
    formData.append('repTitleId', titleNameToId[title] ?? '');
    formData.append('introduction', introduction);
    formData.append('updatePhoto', 'true');

    const token = await getAccessToken();
    try {
      const res = await axios.patch('https://api-keewe.com/api/v1/user/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      await queryClient.invalidateQueries(['profile']);
      await queryClient.invalidateQueries(['mypage']);

      return res.data;
    } catch (err) {
      console.log('에러:', err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TwoButtonModal
        dismissable={false}
        mainTitle={'수정한 내용을 저장할까요?'}
        visible={modalVisible}
        onDismiss={hideModal}
        leftButtonText={'취소'}
        rightButtonText={'저장'}
        leftButtonPress={() => setModalVisible(false)}
        rightButtonPress={() => {
          handleSaveProfileInfo();
          setModalVisible(false);
          navigation.goBack();
        }}
      />
      <TwoButtonModal
        dismissable={false}
        mainTitle={'카메라 접근 권한을 허용해주세요.'}
        subTitle={'설정 > Keewe > 카메라 접근 권한 허용'}
        visible={cameraPermissionModal}
        onDismiss={hideCameraPermissionModal}
        leftButtonText={'취소'}
        rightButtonText={'허용하기'}
        leftButtonPress={() => setCameraPermissionModal(false)}
        rightButtonPress={() => {
          Linking.openSettings();
          setCameraPermissionModal(false);
        }}
      />
      <TwoButtonModal
        dismissable={false}
        mainTitle={'라이브러리 접근 권한을 허용해주세요.'}
        subTitle={'설정 > Keewe > 라이브러리 권한 허용'}
        visible={libraryPermissionModal}
        onDismiss={hideLibraryPermissionModal}
        leftButtonText={'취소'}
        rightButtonText={'허용하기'}
        leftButtonPress={() => setLibraryPermissionModal(false)}
        rightButtonPress={() => {
          Linking.openSettings();
          setLibraryPermissionModal(false);
        }}
      />
      <TwoButtonModal
        dismissable={false}
        mainTitle={'현재 사진을 삭제할까요?'}
        visible={deleteModal}
        onDismiss={hideDeleteModal}
        leftButtonText={'취소'}
        rightButtonText={'삭제하기'}
        leftButtonPress={() => setDeleteModal(false)}
        rightButtonPress={() => {
          setImage('');
          setDeleteModal(false);
        }}
        rightButtonColor={theme.colors.graphic.red}
      />
      <ProfileImage image={image} onPress={() => handlePresentModalPress()} />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={() => null}
        backgroundStyle={{ backgroundColor: theme.colors.graphic.white }}
        backdropComponent={renderBackdrop}
      >
        <View style={styles.sheet}>
          <BottomSheetOption title="라이브러리에서 선택" onPress={handleLibraryPress} />
          <BottomSheetOption title="사진 찍기" onPress={handleShotPress} />
          {image !== '' ? (
            <BottomSheetOption title="현재 사진 삭제" onPress={handleDeletePress} />
          ) : null}
        </View>
      </BottomSheetModal>
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
    </SafeAreaView>
  );
};

export default ProfileEditScreen;

const styles = StyleSheet.create({
  sheet: {
    height: 168,
  },
});
