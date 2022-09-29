import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import InsightLinkTriggerButton from '../../components/buttons/InsightLinkTriggerButton';
import BottomSheetHeader from '../../components/header/BottomSheetHeader';
import HeaderRightButton from '../../components/header/HeaderRightButton';
import AutoGrowScrollTextArea from '../../components/texts/AutoGrowScrollTextArea';
import CountingTextArea from '../../components/texts/CountingTextArea';
import UploadBottomContainer from './UploadBottomContainer';

const UploadScreen = ({ route, navigation }) => {
  const [linkText, setLinkText] = useState<string>('');
  const [insightText, setInsightText] = useState<string>('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isValidSite, setIsValidSite] = useState(false);
  const [textInputHeight, setTextInputHeight] = useState(0);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['30%', '50%', '90%'], []);

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

  const handleSheetLinkComplete = async () => {
    try {
      const URL = linkText.includes('http') ? linkText : `http://${linkText}`;
      const response = await axios.get(URL);
      if (response.status === 200) {
        // valid link.
        console.log('valid response', response.status);
        setIsValidSite(true);
        bottomSheetModalRef.current?.close();
      }
    } catch (error) {
      alert(error);
      setIsValidSite(false);
      console.log('not valid url');
    }
  };

  const handleSheetControl = () => {
    console.log('clicked');
    bottomSheetModalRef.current?.present();
  };

  const handleSheetBackdropPress = () => {
    bottomSheetModalRef.current?.close();
  };

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    [],
  );

  const handleAreaSize = (event: { nativeEvent: { contentSize: { height: number } } }) => {
    const { height } = event.nativeEvent.contentSize;
    const vh = Dimensions.get('window').height;
    console.log(height, vh);
    setTextInputHeight(height - 240);
  };

  useEffect(() => {
    scrollViewRef.current?.scrollTo({ x: 0, y: textInputHeight, animated: true });
  }, [textInputHeight]);

  const scrollViewRef = useRef<ScrollView>(null);

  console.log('textInputHeight: ', textInputHeight);
  return (
    <ScrollView ref={scrollViewRef} style={styles.container}>
      <InsightLinkTriggerButton onPress={handleSheetControl} />
      <Text>{isValidSite ? 'valid site' : 'not valid sitee'}</Text>
      <View style={styles.textContainer}>
        <AutoGrowScrollTextArea
          onContentSizeChange={handleAreaSize}
          inputValue={insightText}
          setInputValue={setInsightText}
          placeholder="인사이트를 입력해주세요."
          limit={400}
          height={280}
          autoFocus={false}
        />
      </View>
      <UploadBottomContainer isSwitchOn={isSwitchOn} setIsSwitchOn={setIsSwitchOn} />

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
      >
        <View style={styles.contentContainer}>
          <BottomSheetHeader
            handleSheetController={handleSheetBackdropPress}
            onPress={handleSheetLinkComplete}
            conditionalValue={linkText}
          />

          <CountingTextArea
            inputValue={linkText}
            placeholder="인사이트를 얻은 링크"
            setInputValue={setLinkText}
            autoFocus={false}
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
