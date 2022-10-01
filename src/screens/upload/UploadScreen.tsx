import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import InsightLinkTriggerButton from '../../components/buttons/InsightLinkTriggerButton';
import BottomSheetHeader from '../../components/header/BottomSheetHeader';
import HeaderRightButton from '../../components/header/HeaderRightButton';
import AutoGrowScrollTextArea from '../../components/texts/AutoGrowScrollTextArea';
import CountingTextArea from '../../components/texts/CountingTextArea';
import { backButtonModalClose } from '../../utils/helper/bottomSheetUtils/backbuttonModalClose';
import handleSheetLinkComplete from '../../utils/helper/fetchAPI/isValidLink';
import FolderSheetContent from './FolderSheetContent';
import LinkSheetContent from './LinkSheetContent';
import UploadBottomContainer from './UploadBottomContainer';

const UploadScreen = ({ route, navigation }) => {
  const [linkText, setLinkText] = useState<string>('');
  const [insightText, setInsightText] = useState<string>('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isValidSite, setIsValidSite] = useState(false);
  const [offSet, setOffSet] = useState(0);

  const linkSheetRef = useRef<BottomSheetModal>(null);
  const folderSheetRef = useRef<BottomSheetModal>(null);

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

  const handleSheetPresent = (Ref: React.RefObject<BottomSheetModalMethods>) => {
    Ref.current?.present();
  };

  const handleSheetClose = (Ref: React.RefObject<BottomSheetModalMethods>) => {
    Ref.current?.close();
  };

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    [],
  );

  const handleAreaSize = (event: { nativeEvent: { contentSize: { height: number } } }) => {
    const { height } = event.nativeEvent.contentSize;
    const vh = Dimensions.get('window').height;
    const FACTOR = 3.4;
    const thirdOfVh = vh / FACTOR;
    console.log('height: ', height);
    console.log('vh: ', vh);
    console.log('thirdOfVh: ', thirdOfVh);
    const OFFSET = height - thirdOfVh;
    setOffSet(OFFSET);
  };

  useEffect(() => {
    scrollViewRef.current?.scrollTo({ x: 0, y: offSet, animated: true });
  }, [offSet]);

  const checkIsValidSite = async () => {
    handleSheetLinkComplete(linkText, linkSheetRef, setIsValidSite);
  };

  const scrollViewRef = useRef<ScrollView>(null);

  // console.log('offSet: ', offSet);
  // console.log('-----------------------');

  // appends event handler for android back button to close modal.
  backButtonModalClose(linkSheetRef);
  backButtonModalClose(folderSheetRef);

  return (
    <ScrollView ref={scrollViewRef} scrollToOverflowEnabled={true} style={styles.container}>
      <InsightLinkTriggerButton
        onPress={() => handleSheetPresent(linkSheetRef)}
        text={isValidSite ? 'VALID' : '인사이트를 입력해주세요.'}
      />
      <View style={styles.textContainer}>
        <AutoGrowScrollTextArea
          onContentSizeChange={handleAreaSize}
          inputValue={insightText}
          setInputValue={setInsightText}
          placeholder="인사이트를 입력해주세요."
          limit={50}
          height={280}
          autoFocus={false}
        />
      </View>
      <UploadBottomContainer
        isSwitchOn={isSwitchOn}
        setIsSwitchOn={setIsSwitchOn}
        presentFolderSheet={() => handleSheetPresent(folderSheetRef)}
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
    flex: 1,
    padding: 24,
    backgroundColor: 'white',
  },

  textarea: {
    width: '100%',
  },
  textContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#12131410',
  },
});

export default UploadScreen;
