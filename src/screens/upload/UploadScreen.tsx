import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import DividerBar from '../../components/bars/DividerBar';
import InsightLinkTriggerButton from '../../components/buttons/InsightLinkTriggerButton';
import UploadLinkCard from '../../components/cards/LinkCardForUpload';
import HeaderRightButton from '../../components/header/HeaderRightButton';
import UploadBackButton from './UploadBackButton';
import StaticSizeScrollTextArea from '../../components/texts/StaticSizeScrollTextArea';
import { IFolder } from '../../types/upload';
import { UploadApis } from '../../utils/api/UploadAPIs';
import {
  handleSheetClose,
  handleSheetPresent,
} from '../../utils/helper/bottomSheetUtils/bottomSheetUtils';
import handleSheetLinkComplete from '../../utils/helper/fetchAPI/isValidLink';
import EditButton from './EditButton';
import FolderSheetContent from './FolderSheetContent';
import LinkSheetContent from './LinkSheetContent';
import UploadBottomContainer from './UploadBottomContainer';
import Toast from 'react-native-toast-message';
import { ChallengeAPI, ChallengeQueryKeys } from '../../utils/api/ChallengeAPI';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { InsightAPI, InsightQueryKeys } from '../../utils/api/InsightAPI';
import MainLottie from '../../components/lotties/MainLottie';
import { UserSpecificChallengeQueryKeys } from '../../utils/api/UserSpecificChallenge';
import { useTheme } from 'react-native-paper';
import TwoButtonModal from '../../components/modal/TwoButtonModal';
import isTextNotOnlySpace from '../../utils/helper/strings/isTextNotOnlySpace';
import { useFocusEffect } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';

const UploadScreen = ({ navigation, route }) => {
  const { isEdit, link, insightId } = route?.params ?? {};
  const [linkText, setLinkText] = useState<string>((link?.url || link) ?? '');
  const [insightText, setInsightText] = useState<string>('');
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [isValidSite, setIsValidSite] = useState(isEdit || false);
  const [folders, setFolders] = useState<IFolder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string>('선택안함');
  const linkSheetRef = useRef<BottomSheetModal>(null);
  const folderSheetRef = useRef<BottomSheetModal>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [linkSheetContentHeight, setLinkSheetContentHeight] = useState<number>(400);
  const [folderSheetContentHeight, setFolderSheetContentHeight] = useState<number>(400);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const queryClient = useQueryClient();
  const theme = useTheme();
  const { isLoading: isEditLoading } = useQuery(
    InsightQueryKeys.getInsight({ insightId }),
    () => InsightAPI.getInsight({ insightId }),
    {
      onSuccess: (response) => {
        setSelectedFolder(response?.data?.drawerName ?? '');
        setInsightText(response?.data?.contents ?? '');
      },
      enabled: insightId !== undefined,
    },
  );

  const { data: challengeProgress, isLoading: isChallengeProgressLoading } = useQuery(
    ChallengeQueryKeys.getChallengeProgress(),
    ChallengeAPI.getChallengeProgress,
  );

  const linkSheetSnapPoints = [linkSheetContentHeight];

  const folderSheetSnapPoints = [folderSheetContentHeight];

  const insightTextLimit = 400;

  const isValidToSubmit = useMemo(() => {
    return (
      isValidSite &&
      !!linkText.length &&
      !!insightText.length &&
      !isLoading &&
      insightText.length <= insightTextLimit &&
      isTextNotOnlySpace(insightText)
    );
  }, [isValidSite, linkText, insightText, isLoading]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <UploadBackButton onPress={() => setIsModalVisible(true)} />,
      headerRight: () => (
        <HeaderRightButton
          backGroundColor={isValidToSubmit ? '#b0e817' : '#12131420'}
          textColor={isValidToSubmit ? 'black' : 'white'}
          borderLine={false}
          disabled={!isValidToSubmit}
          text="완료"
          handlePress={() => {
            setIsLoading(true);
            handleSubmit();
          }}
        />
      ),
    });
  }, [linkText, insightText, isValidToSubmit, navigation, selectedFolder, isSwitchOn]);

  useEffect(() => {
    UploadApis.getFolderList().then(setFolders);

    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });

    return () => {
      keyboardShowListener.remove();
    };
  }, []);

  const handleSubmit = async () => {
    const drawerId = folders.find((folder) => folder.name === selectedFolder)?.id || null;
    const data = {
      participation: isSwitchOn && challengeProgress?.name !== undefined,
      link: linkText,
      contents: insightText,
      drawerId: drawerId,
    };
    try {
      let response;
      if (isEdit) {
        const editData = {
          link: linkText,
          contents: insightText,
          insightId: insightId,
          drawerId: drawerId,
        };
        response = await UploadApis.editInsight(editData);
        queryClient.invalidateQueries(
          InsightQueryKeys.getInsight({ insightId: response.data.insightId }),
        );
      } else {
        response = await UploadApis.uploadInsight(data);
        queryClient.invalidateQueries(UserSpecificChallengeQueryKeys.getUserSpecificChallenge());
      }
      if (response.code === 200) {
        if (isEdit) {
          navigation.goBack();
        } else {
          navigation.pop();
          navigation.navigate('DetailedPost', { insightId: response.data.insightId, isMine: true });
        }
      } else {
        throw new Error(response.message);
      }
      setIsLoading(false);
    } catch (error: unknown) {
      console.log(error);
    }
    return;
  };

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    [],
  );

  const checkIsValidSite = async () => {
    handleSheetLinkComplete(linkText, setLinkText, linkSheetRef, setIsValidSite, () =>
      Toast.show({
        type: 'snackbar',
        text1: '올바른 링크인지 확인해주세요.',
        position: 'bottom',
      }),
    );
  };

  const handleLinkSheetLayout = (event) => {
    const height = event.nativeEvent.layout.height;
    const additinalHeight = keyboardHeight || 350;
    setLinkSheetContentHeight(height + additinalHeight);
  };

  const handleFolderSheetLayout = (event) => {
    const height = event.nativeEvent.layout.height;
    const additinalHeight = keyboardHeight || 350;
    setFolderSheetContentHeight(height + additinalHeight);
  };

  const handleEditPress = () => {
    setIsValidSite(false);
    handleSheetPresent(linkSheetRef);
  };

  const handleFolderSheetComplete = async () => {
    handleSheetClose(folderSheetRef);
    try {
      const completeRes = await UploadApis.createNewFolder(selectedFolder);
      if (completeRes.code === 200) {
        setFolders([...folders, { name: selectedFolder, id: completeRes.data.drawerId }]);
        Toast.show({
          type: 'snackbar',
          text1: '새로운 폴더를 추가했어요.',
          position: 'bottom',
        });
      } else {
        throw new Error('폴더 생성 실패');
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isChallengeProgressLoading && isEditLoading && insightId !== undefined) {
    return <MainLottie />;
  }

  useFocusEffect(
    useCallback(() => {
      const getClipboard = async () => {
        const clipboard = await Clipboard.getStringAsync();
        if (clipboard.startsWith('http')) {
          try {
            await fetch(clipboard, {
              method: 'HEAD',
            }); // 메타데이터 불러오기
            Toast.show({
              type: 'copySnackbar',
              text1: '복사한 링크가 있어요',
              text2: '붙여넣기',
              onPress: () => {
                setLinkText(clipboard);
                setIsValidSite(true);
                Toast.hide();
              },
              position: 'bottom',
            });
            return;
          } catch (error) {
            return;
          }
        }
      };
      getClipboard();
    }, []),
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView scrollToOverflowEnabled={true} contentContainerStyle={styles.container}>
        {isValidSite ? (
          <View style={styles.linkCardContainer}>
            <UploadLinkCard text={linkText} />
            <EditButton onPress={handleEditPress} />
          </View>
        ) : (
          <InsightLinkTriggerButton
            onPress={() => handleSheetPresent(linkSheetRef)}
            text={isValidSite ? 'VALID' : '인사이트를 얻은 링크'}
          />
        )}
        <View style={styles.textContainer}>
          <StaticSizeScrollTextArea
            inputValue={insightText}
            setInputValue={setInsightText}
            placeholder="인사이트를 입력해주세요."
            limit={insightTextLimit}
            height={280}
            autoFocus={true}
          />
        </View>
        <DividerBar style={{ marginTop: 12 }} />
        <UploadBottomContainer
          selectedFolder={selectedFolder}
          isSwitchOn={isSwitchOn}
          setIsSwitchOn={setIsSwitchOn}
          presentFolderSheet={() => handleSheetPresent(folderSheetRef)}
          insightText={insightText}
          challengeProgress={challengeProgress}
        />

        <BottomSheetModal
          ref={linkSheetRef}
          index={0}
          snapPoints={linkSheetSnapPoints}
          backdropComponent={renderBackdrop}
        >
          <View onLayout={handleLinkSheetLayout}>
            <LinkSheetContent
              linkText={linkText}
              setLinkText={setLinkText}
              handleSheetComplete={checkIsValidSite}
              onHeaderLeftPress={() => handleSheetClose(linkSheetRef)}
            />
          </View>
        </BottomSheetModal>
        <BottomSheetModal
          ref={folderSheetRef}
          index={0}
          snapPoints={folderSheetSnapPoints}
          backdropComponent={renderBackdrop}
        >
          <FolderSheetContent
            scrollViewHeight={folderSheetContentHeight}
            handleSheetComplete={handleFolderSheetComplete}
            onHeaderLeftPress={() => {
              handleSheetClose(folderSheetRef);
            }}
            folders={folders}
            setFolder={setFolders}
            selectedFolder={selectedFolder}
            setSelectedFolder={setSelectedFolder}
            onLayout={handleFolderSheetLayout}
          />
        </BottomSheetModal>
        <TwoButtonModal
          dismissable={false}
          mainTitle={isEdit ? '인사이트 수정을 취소할까요?' : '인사이트 작성을 그만할까요?'}
          subTitle={isEdit ? '' : '작성한 인사이트가 사라져요.'}
          visible={isModalVisible}
          onDismiss={() => setIsModalVisible(false)}
          leftButtonText={isEdit ? '취소하기' : '뒤로가기'}
          rightButtonText="계속 작성하기"
          leftButtonPress={() => {
            setIsModalVisible(false);
            navigation.goBack();
          }}
          rightButtonPress={() => setIsModalVisible(false)}
          rightButtonColor={theme.colors.graphic.black}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },

  textContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  linkCardContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    borderWidth: 1,
    borderColor: '#12131420',
    borderRadius: 8,
  },
});

export default UploadScreen;
