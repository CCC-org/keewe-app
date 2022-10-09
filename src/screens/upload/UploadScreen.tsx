import { MaterialCommunityIcons } from '@expo/vector-icons';
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
  backButtonModalClose,
  handleSheetClose,
  handleSheetPresent,
} from '../../utils/helper/bottomSheetUtils/bottomSheetUtils';
import handleSheetLinkComplete from '../../utils/helper/fetchAPI/isValidLink';
import EditButton from './EditButton';
import FolderSheetContent from './FolderSheetContent';
import LinkSheetContent from './LinkSheetContent';
import UploadBottomContainer from './UploadBottomContainer';

const FOLDER_LIST = ['다른폴더', '다른폴더2'];

const UploadScreen = ({ navigation }) => {
  const [linkText, setLinkText] = useState<string>('');
  const [insightText, setInsightText] = useState<string>('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isValidSite, setIsValidSite] = useState(false);
  const [folders, setFolders] = useState<IFolder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string>('');
  const linkSheetRef = useRef<BottomSheetModal>(null);
  const folderSheetRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['30%', '50%', '80%'], []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton
          backGroundColor={!!linkText.length && !!insightText.length ? '#b0e817' : '#12131420'}
          textColor={!!linkText.length && !!insightText.length ? 'black' : 'white'}
          borderLine={false}
          disabled={!!linkText.length && !!insightText.length ? false : true}
          text="완료"
          handlePress={() => handleSubmit()}
        />
      ),
    });
  }, [linkText, insightText, navigation, selectedFolder, isSwitchOn]);

  useEffect(() => {
    UploadApis.getFolderList().then(setFolders);
  }, []);

  // temp
  useEffect(() => {
    console.log(folders);
  }, [folders]);

  const handleSubmit = async () => {
    const data = {
      participation: isSwitchOn,
      link: linkText,
      contents: insightText,
      drawerId: 4,
    };

    try {
      const response = await UploadApis.uploadInsight(data);
      console.log('submit res', response);
      if (response.code === 200) {
        alert('everything is fine, go back to home');
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      alert('error');
    }
  };

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    [],
  );

  const checkIsValidSite = async () => {
    handleSheetLinkComplete(linkText, linkSheetRef, setIsValidSite);
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
        setFolders([...folders, selectedFolder]);
      } else {
        throw new Error('폴더 생성 실패');
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <ScrollView scrollToOverflowEnabled={true} style={styles.container}>
      {isValidSite ? (
        <View style={styles.linkCardContainer}>
          <UploadLinkCard text={linkText} />
          {/* < <MaterialCommunityIcons
            style={{ marginLeft: 20, flexGrow: 1 }}
            name="checkbox-blank-circle"
            size={27}
            color="black"
            onPress={handleEditPress}
          />> */}
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
        index={2}
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
        index={1}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },

  textContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#12131410',
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
