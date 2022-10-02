import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import InsightLinkTriggerButton from '../../components/buttons/InsightLinkTriggerButton';
import BottomSheetHeader from '../../components/header/BottomSheetHeader';
import HeaderRightButton from '../../components/header/HeaderRightButton';
import AutoGrowScrollTextArea from '../../components/texts/AutoGrowScrollTextArea';
import CountingTextArea from '../../components/texts/CountingTextArea';
import {
  backButtonModalClose,
  handleSheetClose,
  handleSheetPresent,
} from '../../utils/helper/bottomSheetUtils/backbuttonModalClose';
import handleSheetLinkComplete from '../../utils/helper/fetchAPI/isValidLink';
import FolderSheetContent from './FolderSheetContent';
import LinkSheetContent from './LinkSheetContent';
import UploadBottomContainer from './UploadBottomContainer';

const UploadScreen = ({ route, navigation }) => {
  const [linkText, setLinkText] = useState<string>('');
  const [insightText, setInsightText] = useState<string>('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isValidSite, setIsValidSite] = useState(false);
  const [offSet, setOffSet] = useState(-5000);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const [inputHeight, setInputHeight] = useState(0);
  const [initialVh, setInitialVh] = useState(0);
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

  // const handleSheetPresent = (Ref: React.RefObject<BottomSheetModalMethods>) => {
  //   Ref.current?.present();
  // };

  // const handleSheetClose = (Ref: React.RefObject<BottomSheetModalMethods>) => {
  //   Ref.current?.close();
  // };

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    [],
  );

  const handleAreaSize = (width: number, scrollViewHeight: number) => {
    // const { height } = event.nativeEvent.contentSize;
    // const vh = Dimensions.get('window').height;
    // const FACTOR = 3.4;
    // const thirdOfVh = vh / FACTOR;
    // const OFFSET = height - thirdOfVh;
    // console.log('scrollViewHeight From contentsizeChange: ', scrollViewHeight);
    // setOffSet(vh - scrollViewHeight);
  };

  // useEffect(() => {
  //   scrollViewRef.current?.scrollTo({ y: offSet, animated: true });
  // }, [offSet]);

  console.log('root offset : ', offSet);
  const vh = Dimensions.get('window').height;
  // console.log('vh: ', vh);
  // console.log('-----------');

  const checkIsValidSite = async () => {
    handleSheetLinkComplete(linkText, linkSheetRef, setIsValidSite);
  };

  const handleSizechange = (event) => {
    // console.log('object');
  };

  backButtonModalClose(folderSheetRef);
  backButtonModalClose(linkSheetRef);
  const viewRef = useRef<View>(null);
  useEffect(() => {
    // get the initial height of the view
    setTimeout(() => {
      viewRef.current?.measure((x, y, width, height) => {
        // console.log('initial View height: ', height);
        setInitialVh(height);
      });
    }, 500);
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        scrollToOverflowEnabled={true}
        style={styles.container}
        ref={scrollViewRef}
        // onLayout={(event) => {
        //   const { height } = event.nativeEvent.layout;
        //   // console.log('scrollViewHeight: ', height);
        //   setScrollViewHeight(height);
        // }}
        onContentSizeChange={handleAreaSize}
      >
        <InsightLinkTriggerButton
          onPress={() => handleSheetPresent(linkSheetRef)}
          text={isValidSite ? 'VALID' : '인사이트를 입력해주세요.'}
        />
        <View
          ref={viewRef}
          style={styles.textContainer}
          onLayout={(e) => {
            const { height, y } = e.nativeEvent.layout;
            // console.log('ViewHeight from onLayout: ', height);
            //          248          227
            console.log('right before setOffset: ', height, initialVh);
            const calc = height - initialVh - 80;
            scrollViewRef.current?.scrollTo({ y: calc, animated: true });
            setOffSet(calc > 0 && calc <= 5000 ? calc : 0);
          }}
        >
          <AutoGrowScrollTextArea
            // onContentSizeChange={handleAreaSize}
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
          setPosition={setScrollViewHeight}
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
    </View>
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
