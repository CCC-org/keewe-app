import { Feather } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import axios from 'axios';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Switch, useTheme } from 'react-native-paper';
import InsightLinkTriggerButton from '../../components/buttons/InsightLinkTriggerButton';
import BottomSheetHeader from '../../components/header/BottomSheetHeader';
import HeaderRightButton from '../../components/header/HeaderRightButton';
import CountingTextArea from '../../components/texts/CountingTextArea';

const UploadScreen = ({ route, navigation }) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const [linkText, setLinkText] = useState<string>('');
  const [insightText, setInsightText] = useState<string>('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isValidSite, setIsValidSite] = useState(false);
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const theme = useTheme();
  // variables
  // const snapPoints = useMemo(() => ['90%'], []);

  const snapPoints = useMemo(() => ['30%', '50%', '90%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // append headerRightButton
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton
          backGroundColor="#12131420"
          textColor="white"
          borderLine={false}
          disabled={true}
          text="완료"
          handlePress={() => setSheetIsOpen(true)}
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
        setSheetIsOpen(false);
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

  // close the bottomSheet when the user clicks outside of it
  const handleSheetBackdropPress = () => {
    bottomSheetModalRef.current?.close();
    setSheetIsOpen(false);
  };

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    [],
  );

  // renders
  return (
    <View style={styles.container}>
      <InsightLinkTriggerButton onPress={handleSheetControl} />
      <Text>{isValidSite ? 'valid site' : 'not valid site'}</Text>
      <View style={styles.textContainer}>
        <CountingTextArea
          style={styles.textarea}
          inputValue={insightText}
          placeholder="인사이트를 입력해주세요."
          setInputValue={setInsightText}
          limit={400}
          height={280}
          autoFocus={false}
        />
      </View>
      <View style={styles.bottomContainer}>
        <View>
          <Text style={theme.fonts.text.body1.bold}>챌린지 명</Text>
          <Text style={theme.fonts.text.body2.regular}>6/12번째 기록 중</Text>
        </View>
        <View>
          <Switch
            value={isSwitchOn}
            onValueChange={() => setIsSwitchOn(!isSwitchOn)}
            style={styles.switch}
            color={'#b0e817'}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View>
          <Text style={theme.fonts.text.body1.bold}>폴더</Text>
        </View>
        <View>
          <Feather name="chevron-right" size={24} color="black" />
        </View>
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
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
    </View>
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
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
});

export default UploadScreen;
