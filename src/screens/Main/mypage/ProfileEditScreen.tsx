import { Linking, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import HeaderRightButton from '../../../components/header/HeaderRightButton';
import { useTheme } from 'react-native-paper';
import ProfileList from './ProfileList';
import { TOTAL_TAG } from '../../../constants/Interests';
import TwoButtonModal from '../../../components/modal/TwoButtonModal';
import ProfileImage from './ProfileImage';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import BottomSheetOption from '../../../components/bottomsheet/BottomSheetOption';
import * as ImagePicker from 'expo-image-picker';

const ProfileEditScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [permissionModal, setPermissionModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const hideModal = () => setModalVisible(false);
  const hidePermissionModal = () => setPermissionModal(false);
  const hideDeleteModal = () => setDeleteModal(false);
  const [btnAbled, setBtnAbled] = useState<boolean>(true);
  const [nickname, setNickname] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [introduction, setIntroduction] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [customCategory, setCustomCategory] = useState<string[]>([]);
  const [image, setImage] = useState<string | undefined>(undefined);

  const handleComplete = () => setModalVisible(true);
  const changePermission = () => setPermissionModal(true);
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
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      changePermission();
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
    bottomSheetModalRef.current?.dismiss();
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      changePermission();
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
    bottomSheetModalRef.current?.dismiss();
  };

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    [],
  );
  return (
    <>
      <BottomSheetModalProvider>
        <TwoButtonModal
          dismissable={false}
          mainTitle={'수정한 내용을 저장할까요?'}
          visible={modalVisible}
          onDismiss={hideModal}
          leftButtonText={'취소'}
          rightButtonText={'저장'}
          leftButtonPress={() => setModalVisible(false)}
          rightButtonPress={() => {
            alert('저장은 타이틀 작업이 된 후에 작업할 예정입니다!');
            setModalVisible(false);
          }}
        />
        <TwoButtonModal
          dismissable={false}
          mainTitle={'카메라 접근 권한을 허용해주세요.'}
          subTitle={'설정 > Keewe > 카메라 접근 권한 허용'}
          visible={permissionModal}
          onDismiss={hidePermissionModal}
          leftButtonText={'취소'}
          rightButtonText={'허용하기'}
          leftButtonPress={() => setPermissionModal(false)}
          rightButtonPress={() => {
            Linking.openSettings();
            setPermissionModal(false);
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
            setImage(undefined);
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
            <BottomSheetOption title="현재 사진 삭제" onPress={handleDeletePress} />
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
      </BottomSheetModalProvider>
    </>
  );
};

export default ProfileEditScreen;

const styles = StyleSheet.create({
  sheet: {
    height: 168,
    justifyContent: 'space-around',
  },
});
