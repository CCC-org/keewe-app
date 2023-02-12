import { useBottomSheet } from '@gorhom/bottom-sheet';
import React, { useEffect } from 'react';
import { BackHandler, Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import BottomSheetHeader from '../../components/header/BottomSheetHeader';
import HeaderRightButton from '../../components/header/HeaderRightButton';
import CountingTextArea from '../../components/texts/CountingTextArea';
import {
  backButtonModalClose,
  handleSheetClose,
} from '../../utils/helper/bottomSheetUtils/bottomSheetUtils';

interface LinkSheetContentProps {
  onHeaderLeftPress: () => void;
  handleSheetComplete: () => void;
  linkText: string;
  setLinkText: (input: string) => void;
}

const LinkSheetContent = ({
  onHeaderLeftPress,
  handleSheetComplete,
  linkText,
  setLinkText,
}: LinkSheetContentProps) => {
  const { close } = useBottomSheet();
  backButtonModalClose(close);
  return (
    <View style={styles.contentContainer}>
      <BottomSheetHeader
        onLeftButtonPress={onHeaderLeftPress}
        title="링크"
        headerRightButton={() => (
          <HeaderRightButton
            text="완료"
            backGroundColor={linkText.length ? '#b0e817' : '#12131420'}
            textColor={linkText.length ? 'black' : '#ffffff'}
            disabled={false}
            borderLine={false}
            handlePress={handleSheetComplete}
          />
        )}
      />

      <CountingTextArea
        inputValue={linkText}
        placeholder="인사이트를 얻은 링크"
        setInputValue={setLinkText}
        autoFocus={true}
        limitTextStyle={{ color: 'white' }}
      />
    </View>
  );
};

export default LinkSheetContent;

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    height: '80%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});
