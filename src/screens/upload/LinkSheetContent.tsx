import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import BottomSheetHeader from '../../components/header/BottomSheetHeader';
import CountingTextArea from '../../components/texts/CountingTextArea';
import HeaderRightButton from '../../components/header/HeaderRightButton';

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
  return (
    <View style={styles.contentContainer}>
      <BottomSheetHeader
        onLeftButtonPress={onHeaderLeftPress}
        onPress={handleSheetComplete}
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
