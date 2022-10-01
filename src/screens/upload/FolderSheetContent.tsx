import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import BottomSheetHeader from '../../components/header/BottomSheetHeader';
import HeaderRightButton from '../../components/header/HeaderRightButton';

interface FolderSheetContentProps {
  onHeaderLeftPress: () => void;
  handleSheetComplete: () => void;
}

const FolderSheetContent = ({
  onHeaderLeftPress,
  handleSheetComplete,
}: FolderSheetContentProps) => {
  return (
    <View style={styles.contentContainer}>
      <BottomSheetHeader
        onLeftButtonPress={onHeaderLeftPress}
        onPress={handleSheetComplete}
        title="새폴더 만들기"
        headerRightButton={() => (
          <HeaderRightButton
            text="완료"
            disabled={false}
            borderLine={false}
            backGroundColor="#b0e817"
            textColor="black"
            handlePress={handleSheetComplete}
          />
        )}
      />
      <View style={{ width: 100, height: 100, borderWidth: 2 }}></View>
    </View>
  );
};

export default FolderSheetContent;

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    height: '80%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});
