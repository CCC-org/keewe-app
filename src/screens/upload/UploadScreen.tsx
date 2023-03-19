import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import DividerBar from '../../components/bars/DividerBar';
import InsightLinkTriggerButton from '../../components/buttons/InsightLinkTriggerButton';
import UploadLinkCard from '../../components/cards/LinkCardForUpload';
import HeaderRightButton from '../../components/header/HeaderRightButton';
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

const UploadScreen = ({ navigation }) => {
  const [linkText, setLinkText] = useState<string>('');
  const [insightText, setInsightText] = useState<string>('');
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [isValidSite, setIsValidSite] = useState(false);
  const [folders, setFolders] = useState<IFolder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string>('');
  const linkSheetRef = useRef<BottomSheetModal>(null);
  const folderSheetRef = useRef<BottomSheetModal>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const snapPoints = useMemo(() => ['50%', '80%'], []);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton
          backGroundColor={
            isValidSite && !!linkText.length && !!insightText.length && !isClicked
              ? '#b0e817'
              : '#12131420'
          }
          textColor={
            isValidSite && !!linkText.length && !!insightText.length && !isClicked
              ? 'black'
              : 'white'
          }
          borderLine={false}
          disabled={
            isValidSite && !!linkText.length && !!insightText.length && !isClicked ? false : true
          }
          text="완료"
          handlePress={() => {
            setIsClicked(true);
            handleSubmit();
          }}
        />
      ),
    });
  }, [
    linkText,
    insightText,
    navigation,
    selectedFolder,
    isSwitchOn,
    isValidSite,
    isClicked,
    setIsClicked,
  ]);

  useEffect(() => {
    UploadApis.getFolderList().then(setFolders);
  }, []);

  const handleSubmit = async () => {
    alert(isClicked);
    const drawerId = folders.find((folder) => folder.name === selectedFolder)?.id || null;
    const data = {
      participation: isSwitchOn,
      link: linkText,
      contents: insightText,
      drawerId: drawerId,
    };

    try {
      const response = await UploadApis.uploadInsight(data);
      if (response.code === 200) {
        alert('everything is fine, go back to home');
      } else {
        throw new Error(response.message);
      }
    } catch (error: unknown) {
      alert(error);
    }
    return;
  };

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    [],
  );

  const checkIsValidSite = async () => {
    handleSheetLinkComplete(linkText, linkSheetRef, setIsValidSite, () =>
      Toast.show({
        type: 'snackbar',
        text1: '올바른 링크인지 확인해주세요.',
        position: 'bottom',
      }),
    );
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
      alert(error);
    }
  };
  return (
    <>
      <ScrollView scrollToOverflowEnabled={true} contentContainerStyle={styles.container}>
        {isValidSite ? (
          <View style={styles.linkCardContainer}>
            <UploadLinkCard text={linkText} />
            <EditButton onPress={handleEditPress} />
          </View>
        ) : (
          <InsightLinkTriggerButton
            onPress={() => handleSheetPresent(linkSheetRef)}
            text={isValidSite ? 'VALID' : '인사이트를 입력해주세요.'}
          />
        )}
        <View style={styles.textContainer}>
          <StaticSizeScrollTextArea
            inputValue={insightText}
            setInputValue={setInsightText}
            placeholder="인사이트를 입력해주세요."
            limit={400}
            height={280}
            autoFocus={false}
          />
        </View>
        <DividerBar style={{ marginTop: 12 }} />
        <UploadBottomContainer
          selectedFolder={selectedFolder}
          isSwitchOn={isSwitchOn}
          setIsSwitchOn={setIsSwitchOn}
          presentFolderSheet={() => handleSheetPresent(folderSheetRef)}
          insightText={insightText}
        />

        <BottomSheetModal
          ref={linkSheetRef}
          index={1}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
        >
          <LinkSheetContent
            linkText={linkText}
            setLinkText={setLinkText}
            handleSheetComplete={checkIsValidSite}
            onHeaderLeftPress={() => handleSheetClose(linkSheetRef)}
          />
        </BottomSheetModal>
        <BottomSheetModal
          ref={folderSheetRef}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
        >
          <FolderSheetContent
            handleSheetComplete={handleFolderSheetComplete}
            onHeaderLeftPress={() => handleSheetClose(folderSheetRef)}
            folders={folders}
            setFolder={setFolders}
            selectedFolder={selectedFolder}
            setSelectedFolder={setSelectedFolder}
          />
        </BottomSheetModal>

        {/* Invalid Link snackbar */}
      </ScrollView>
    </>
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
