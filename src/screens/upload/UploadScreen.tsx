import { LinkPreview } from '@flyerhq/react-native-link-preview';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import InsightLinkTriggerButton from '../../components/buttons/InsightLinkTriggerButton';
import LinkCard from '../../components/cards/LinkCard';
import HeaderRightButton from '../../components/header/HeaderRightButton';
import StaticSizeScrollTextArea from '../../components/texts/StaticSizeScrollTextArea';
import {
  backButtonModalClose,
  handleSheetClose,
  handleSheetPresent,
} from '../../utils/helper/bottomSheetUtils/bottomSheetUtils';
import handleSheetLinkComplete from '../../utils/helper/fetchAPI/isValidLink';
import FolderSheetContent from './FolderSheetContent';
import LinkSheetContent from './LinkSheetContent';
import UploadBottomContainer from './UploadBottomContainer';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const UploadScreen = ({ navigation }) => {
  const [linkText, setLinkText] = useState<string>('');
  const [insightText, setInsightText] = useState<string>('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isValidSite, setIsValidSite] = useState(false);
  const linkSheetRef = useRef<BottomSheetModal>(null);
  const folderSheetRef = useRef<BottomSheetModal>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const snapPoints = useMemo(() => ['30%', '50%', '80%'], []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton
          backGroundColor="#12131420"
          textColor="white"
          borderLine={false}
          disabled={true}
          text="완료"
          handlePress={() => alert('pressed')}
        />
      ),
    });
  }, [navigation]);

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

  backButtonModalClose(linkSheetRef);
  backButtonModalClose(folderSheetRef);

  return (
    <ScrollView scrollToOverflowEnabled={true} style={styles.container} ref={scrollViewRef}>
      {isValidSite ? (
        <View style={styles.linkCardContainer}>
          <View style={{ flexGrow: 3 }}>
            <LinkCard text={linkText} />
          </View>
          <MaterialCommunityIcons
            style={{ marginLeft: 20, flexGrow: 1 }}
            name="checkbox-blank-circle"
            size={27}
            color="black"
            onPress={handleEditPress}
          />
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
      <View
        style={{
          width: '100%',
          borderBottomWidth: 1,
          borderBottomColor: '#12131410',
          marginTop: 12,
        }}
      ></View>

      <UploadBottomContainer
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
        index={2}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
      >
        <FolderSheetContent
          handleSheetComplete={() => handleSheetClose(folderSheetRef)}
          onHeaderLeftPress={() => handleSheetClose(folderSheetRef)}
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
  },
});

export default UploadScreen;
