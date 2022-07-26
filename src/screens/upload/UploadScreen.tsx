import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import DividerBar from '../../components/bars/DividerBar';
import SnackBar from '../../components/bars/SnackBar';
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

const UploadScreen = ({ navigation }) => {
  const [linkText, setLinkText] = useState<string>('');
  const [insightText, setInsightText] = useState<string>('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isValidSite, setIsValidSite] = useState(false);
  const [folders, setFolders] = useState<IFolder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string>('');
  const linkSheetRef = useRef<BottomSheetModal>(null);
  const folderSheetRef = useRef<BottomSheetModal>(null);
  // SnackBar states
  const [isLinkSnackBarOpen, setIsLinkSnackBarOpen] = useState(false);
  const [isFolderSnackBarOpen, setIsFolderSnackBarOpen] = useState(false);

  const snapPoints = useMemo(() => ['50%', '80%'], []);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton
          backGroundColor={
            isValidSite && !!linkText.length && !!insightText.length ? '#b0e817' : '#12131420'
          }
          textColor={isValidSite && !!linkText.length && !!insightText.length ? 'black' : 'white'}
          borderLine={false}
          disabled={isValidSite && !!linkText.length && !!insightText.length ? false : true}
          text="완료"
          handlePress={() => handleSubmit()}
        />
      ),
    });
  }, [linkText, insightText, navigation, selectedFolder, isSwitchOn, isValidSite]);

  useEffect(() => {
    UploadApis.getFolderList().then(setFolders);
  }, []);

  const handleSubmit = async () => {
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
  };

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    [],
  );

  const checkIsValidSite = async () => {
    handleSheetLinkComplete(linkText, linkSheetRef, setIsValidSite, setIsLinkSnackBarOpen);
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
        setIsFolderSnackBarOpen(true);
        setTimeout(() => {
          setIsFolderSnackBarOpen(false);
        }, 3000);
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
      <SnackBar visible={isLinkSnackBarOpen} text="올바른 링크인지 확인해주세요." />
      <SnackBar visible={isFolderSnackBarOpen} text="새로운 폴더를 추가했어요" />
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
