import { useBottomSheet } from '@gorhom/bottom-sheet';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import BottomSheetHeader from '../../components/header/BottomSheetHeader';
import HeaderRightButton from '../../components/header/HeaderRightButton';
import CountingTextArea from '../../components/texts/CountingTextArea';
import theme from '../../theme/light';
import { backButtonModalClose } from '../../utils/helper/bottomSheetUtils/bottomSheetUtils';

interface DetailReportSheetContentProps {
  onHeaderLeftPress: () => void;
  handleSheetComplete: () => void;
  reasonText?: string;
  setReasonText: (input: string) => void;
  overflow: boolean;
  limit: number;
}

const DetailReportSheetContent = ({
  onHeaderLeftPress,
  handleSheetComplete,
  reasonText = '',
  setReasonText,
  overflow,
  limit,
}: DetailReportSheetContentProps) => {
  const { close } = useBottomSheet();
  backButtonModalClose(close);
  return (
    <View style={styles.contentContainer}>
      <BottomSheetHeader
        iconName={'arrowleft'}
        onLeftButtonPress={onHeaderLeftPress}
        title="기타 신고 사유"
        headerRightButton={() => (
          <HeaderRightButton
            text="완료"
            backGroundColor={overflow ? '#b0e817' : '#12131420'}
            textColor={overflow ? 'black' : '#ffffff'}
            disabled={!overflow ? true : false}
            borderLine={false}
            handlePress={handleSheetComplete}
          />
        )}
      />
      <CountingTextArea
        inputValue={reasonText}
        placeholder="신고 사유를 입력해주세요."
        setInputValue={setReasonText}
        autoFocus={true}
        limit={limit}
        limitTextStyle={{ color: `${theme.colors.graphic.black}50` }}
        style={{ height: 500 }}
        height={350}
      />
    </View>
  );
};

export default DetailReportSheetContent;

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    height: '80%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});
