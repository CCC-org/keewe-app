import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import InsightLinkTriggerButton from '../../components/buttons/InsightLinkTriggerButton';
import BottomSheetHeader from '../../components/header/BottomSheetHeader';
import HeaderRightButton from '../../components/header/HeaderRightButton';
import AutoGrowScrollTextArea from '../../components/texts/AutoGrowScrollTextArea';
import CountingTextArea from '../../components/texts/CountingTextArea';
import { backButtonModalClose } from '../../utils/helper/backbuttonModalClose';
import handleSheetLinkComplete from '../../utils/helper/fetchAPI/isValidLink';
import UploadBottomContainer from './UploadBottomContainer';

const UploadScreen = ({ route, navigation }) => {
  const [linkText, setLinkText] = useState<string>('');
  const [insightText, setInsightText] = useState<string>('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isValidSite, setIsValidSite] = useState(false);
  const [offSet, setOffSet] = useState(0);

  const LinkSheetRef = useRef<BottomSheetModal>(null);

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

  const handleSheetControl = () => {
    console.log('clicked');
    LinkSheetRef.current?.present();
  };

  const handleSheetBackdropPress = () => {
    LinkSheetRef.current?.close();
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

  const scrollViewRef = useRef<ScrollView>(null);

  console.log('offSet: ', offSet);
  console.log('-----------------------');

  // appends event handler for android back button to close modal.
  backButtonModalClose(LinkSheetRef);

  return (
    <ScrollView ref={scrollViewRef} scrollToOverflowEnabled={true} style={styles.container}>
      <InsightLinkTriggerButton
        onPress={handleSheetControl}
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
      <UploadBottomContainer isSwitchOn={isSwitchOn} setIsSwitchOn={setIsSwitchOn} />

      <BottomSheetModal
        ref={LinkSheetRef}
        index={2}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
      >
        <View style={styles.contentContainer}>
          <BottomSheetHeader
            handleSheetController={handleSheetBackdropPress}
            onPress={() => handleSheetLinkComplete(linkText, LinkSheetRef, setIsValidSite)}
            conditionalValue={linkText}
          />

          <CountingTextArea
            inputValue={linkText}
            placeholder="인사이트를 얻은 링크"
            setInputValue={setLinkText}
            autoFocus={true}
          />
        </View>
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
  contentContainer: {
    width: '100%',
    height: '80%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
