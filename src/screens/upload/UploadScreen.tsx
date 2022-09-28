import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import CountingTextArea from '../../components/texts/CountingTextArea';
import BottomSheetHeader from '../../components/header/BottomSheetHeader';
import InsightLinkTriggerButton from '../../components/buttons/InsightLinkTriggerButton';
import HeaderRightButton from '../../components/header/HeaderRightButton';
import { Button } from 'react-native-paper';
import CustomBackdrop from '../../components/backdrops/BackDrop';
import axios from 'axios';

const UploadScreen = ({ route, navigation }) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const [linkText, setLinkText] = useState<string>('');
  const [insightText, setInsightText] = useState<string>('');
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  // const snapPoints = useMemo(() => ['90%'], []);

  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

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
        bottomSheetRef.current?.close();
      }
    } catch (error) {
      console.log(error);
      console.log('not valid url');
    }
  };

  const handleSheetControl = () => {
    console.log(sheetIsOpen);
    if (sheetIsOpen) {
      bottomSheetRef.current?.close();
      setSheetIsOpen(false);
    } else {
      bottomSheetRef.current?.expand();
      setSheetIsOpen(true);
    }
  };

  // close the bottomSheet when the user clicks outside of it
  const handleSheetBackdropPress = () => {
    bottomSheetRef.current?.close();
    setSheetIsOpen(false);
  };

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={2} />,
    [],
  );

  // renders
  return (
    <View style={styles.container}>
      <InsightLinkTriggerButton onPress={handleSheetControl} />
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
          <Text>챌린지 명</Text>
          <Text>6/12번째 기록 중</Text>
        </View>
        <View>
          <Text>Toggle Button</Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View>
          <Text>폴더</Text>
        </View>
        <View>
          <Text>right arrow</Text>
        </View>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
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
      </BottomSheet>
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
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
});

export default UploadScreen;
