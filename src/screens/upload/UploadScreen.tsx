import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import CountingTextArea from '../../components/texts/CountingTextArea';
import BottomSheetHeader from '../../components/header/BottomSheetHeader';
import { Feather } from '@expo/vector-icons';

const UploadScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState<string>('');
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['90%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handlePress = () => {
    alert('handlePress');
  };

  // renders
  return (
    <View style={styles.container}>
      <Pressable onPress={() => setIsOpen(!isOpen)}>
        <Text>Open!</Text>
      </Pressable>
      {isOpen && (
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View style={styles.contentContainer}>
            <BottomSheetHeader onPress={handlePress} conditionalValue={text} />
            <CountingTextArea
              inputValue={text}
              placeholder="인사이트를 얻은 링크"
              setInputValue={setText}
            />
          </View>
        </BottomSheet>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    width: '100%',
    height: '80%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});

export default UploadScreen;
