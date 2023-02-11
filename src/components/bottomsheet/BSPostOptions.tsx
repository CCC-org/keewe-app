import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from 'react-native-paper';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Feather } from '@expo/vector-icons';
import ConditionalButton from '../buttons/ConditionalButton';
import BottomSheetHeader from '../header/BottomSheetHeader';
import HeaderRightButton from '../header/HeaderRightButton';
import CountingTextArea from '../texts/CountingTextArea';

interface BSPostOptionsProps {
  modalRef: React.RefObject<BottomSheetModalMethods>;
}

const BSPostOptions = ({ modalRef }: BSPostOptionsProps) => {
  const { fonts } = useTheme();
  const styles = createStyles(fonts);
  const [isReport, setIsReport] = useState(false);
  const [selectedReport, setSelectedReport] = useState<number | null>(null);
  const [reportText, setReportText] = useState('');
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
              handlePress={() => alert('right')}
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
        <Pressable onPress={handleEtcReason}>
          <Text style={styles.clickableOption}>
            <Text>기타 사유 신고</Text>
          </Text>
        </Pressable>
        <Pressable onPress={() => console.log('신고하기')} style={{ marginTop: 72 }}>
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
      <Pressable style={styles.option}>
        <Text style={[fonts.text.body1.regular]}>Option 2</Text>
      </Pressable>
    </ScrollView>
  );
};

export default BSPostOptions;
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

const reportOptions = [
  {
    id: 1,
    title: '스팸',
  },
  {
    id: 2,
    title: '부적절한 내용(혐오/음란)',
  },
  {
    id: 3,
    title: '과도한 비속어/욕설',
  },
  {
    id: 4,
    title: '사칭/사기 의심',
  },
];
