import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { ScrollView } from 'react-native-gesture-handler';
import CountingTextArea from '../components/texts/CountingTextArea';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['10%', '50', '80%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  return (
    <View style={styles.container}>
      <Pressable onPress={() => setIsOpen(!isOpen)}>
        <Text>Open!</Text>
      </Pressable>
      {isOpen && (
        <BottomSheet
          ref={bottomSheetRef}
          index={2}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View style={styles.contentContainer}>
            <CountingTextArea
              infoText="asdf"
              inputValue={text}
              placeholder="adfdffdfdf"
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
  },
});

export default App;
