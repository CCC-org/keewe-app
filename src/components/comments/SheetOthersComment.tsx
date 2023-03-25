import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from 'react-native-paper';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Feather } from '@expo/vector-icons';
import ConditionalButton from '../buttons/ConditionalButton';
import BottomSheetHeader from '../header/BottomSheetHeader';
import HeaderRightButton from '../header/HeaderRightButton';
import CountingTextArea from '../texts/CountingTextArea';
import TwoButtonModal from '../modal/TwoButtonModal';
import { reportInsight, reportType } from '../../utils/api/report/insight/insightReport';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { blockApi } from '../../utils/api/block/block';

interface BSPostOptionsProps {
  modalRef: React.RefObject<BottomSheetModalMethods>;
  commentId: number;
  userId: number | string;
  userName: string;
}

const SheetOthersComment = ({
  modalRef,
  userId,
  userName,
  commentId: insightId,
}: BSPostOptionsProps) => {
  const { fonts } = useTheme();
  const styles = createStyles(fonts);
  const [isReport, setIsReport] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState<number | null>(null);
  const [reportText, setReportText] = useState('');
  const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);
  const handlePress = () => {
    setIsReport(true);
    modalRef.current?.snapToIndex(1);
  };

  const handleEtcReason = () => {
    modalRef.current?.snapToIndex(2);
    setSelectedReport(-1);
  };

  const handleExitText = () => {
    modalRef.current?.snapToIndex(1);
    setSelectedReport(null);
    setReportText('');
  };

  const handleBlockUser = async (userId: number) => {
    try {
      const response = await blockApi.postBlockUser(userId);
      console.log('🚀 ~ file: SheetOthersComment.tsx:54 ~ handleBlockUser ~ response:', response);
      if (response === true) {
        Toast.show({
          type: 'snackbar',
          text1: '사용자를 차단했어요.',
          position: 'bottom',
        });
        modalRef.current?.close();
      } else throw new Error('사용자를 차단하는데 실패했어요.');
    } catch (error) {
      if (error instanceof Error) {
        Toast.show({
          type: 'snackbar',
          text1: error.message,
          position: 'bottom',
        });
        modalRef.current?.close();
      }
    }

    setIsModalVisible(false);
  };

  const handleReportSubmit = () => {
    const reportType =
      reportOptions.find((option) => option.id === selectedReport)?.reportType ||
      ('OTHERS' as const);

    reportInsight({ insightId, reason: reportText, reportType }).then((res) => {
      if (res?.code === 200) {
        setSelectedReport(null);
        setIsReport(false);
        // BUG: 기타 사유 사항으로 신고를 할때, settimeout을 하지 않으면,
        // 모달창이 dismiss하지 않기 때문에, settimeout을 이용해서 dismiss를 해준다.
        setTimeout(() => {
          modalRef.current?.dismiss();
        }, 100);
        Toast.show({
          type: 'snackbar',
          text1: '인사이트를 신고했어요.',
          position: 'bottom',
        });
      }
    });
  };

  if (selectedReport === -1) {
    return (
      <View style={styles.contentContainer}>
        <BottomSheetHeader
          onLeftButtonPress={handleExitText}
          title="기타 신고 사유"
          iconName="arrowleft"
          headerRightButton={() => (
            <HeaderRightButton
              text="완료"
              backGroundColor={reportText.length ? '#b0e817' : '#12131420'}
              textColor={reportText.length ? 'black' : '#ffffff'}
              disabled={!reportText.length}
              borderLine={false}
              handlePress={handleReportSubmit}
            />
          )}
        />
        <CountingTextArea
          inputValue={reportText}
          placeholder="인사이트를 얻은 링크"
          setInputValue={setReportText}
          autoFocus={true}
          limit={150}
        />
      </View>
    );
  }

  if (isReport) {
    return (
      <ScrollView style={styles.optionContainer}>
        <Text style={styles.header}>무엇이 문제인지 알려주세요</Text>
        {reportOptions.map((option) => (
          <Pressable
            key={option.id}
            style={styles.clickableOption}
            onPress={() => setSelectedReport(option.id)}
          >
            <Text
              style={[
                styles.optionTitle,
                { color: selectedReport === option.id ? '#486006' : 'black' },
              ]}
            >
              {option.title}
            </Text>
            {selectedReport === option.id && <Feather name="check" size={22} color="#486006" />}
          </Pressable>
        ))}
        <Pressable onPress={handleEtcReason} style={styles.clickableOption}>
          <Text style={styles.optionTitle}>
            <Text>기타 사유 신고</Text>
          </Text>
        </Pressable>
        <Pressable onPress={handleReportSubmit} style={{ marginTop: 72 }}>
          <ConditionalButton
            isActive={selectedReport !== null}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onPress={() => {}}
            width={'100%'}
            text="신고하기"
          />
        </Pressable>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.optionContainer}>
      <Pressable style={styles.option} onPress={handlePress}>
        <Text style={[fonts.text.body1.regular]}>신고하기</Text>
      </Pressable>
      <Pressable style={styles.option} onPress={() => setIsModalVisible(true)}>
        <Text style={[fonts.text.body1.regular]}>사용자 차단하기</Text>
      </Pressable>
      <TwoButtonModal
        dismissable={false}
        mainTitle={`${userName}님을 차단할까요?`}
        subTitle="서로에게 남긴 댓글과 반응이 모두 삭제되며 복구가 불가능해요. 서로의 댓글, 기록, 프로필을 볼 수 없어요."
        visible={isModalVisible}
        onDismiss={() => setIsModalVisible(false)}
        leftButtonText="취소"
        rightButtonText="차단"
        leftButtonPress={() => setIsModalVisible(false)}
        rightButtonPress={() => handleBlockUser(userId)}
        rightButtonColor="#f24822"
      />
    </ScrollView>
  );
};

export default SheetOthersComment;
function createStyles(fonts: ReactNativePaper.ThemeFonts) {
  const styles = StyleSheet.create({
    contentContainer: {
      width: '100%',
      height: '80%',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    optionContainer: {
      backgroundColor: 'white',
      padding: 16,
    },
    option: {
      paddingVertical: 18,
    },
    clickableOption: {
      paddingVertical: 18,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    header: {
      ...fonts.text.headline1,
      marginBottom: 24,
    },
    optionTitle: {
      ...fonts.text.body1.regular,
    },
  });
  return styles;
}

const reportOptions: {
  id: number;
  title: string;
  reportType: reportType['reportType'];
}[] = [
  {
    id: 1,
    title: '스팸',
    reportType: 'SPAM',
  },
  {
    id: 2,
    title: '부적절한 내용(혐오/음란)',
    reportType: 'INAPPROPRIATE_CONTENT',
  },
  {
    id: 3,
    title: '과도한 비속어/욕설',
    reportType: 'ABUSE',
  },
  {
    id: 4,
    title: '사칭/사기 의심',
    reportType: 'IMPERSONATION',
  },
];
