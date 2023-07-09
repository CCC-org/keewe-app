import { Feather } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Switch, useTheme } from 'react-native-paper';
import { ChallengeAPI } from '../../utils/api/ChallengeAPI';

interface UploadBottomContainerProps {
  isSwitchOn: boolean;
  setIsSwitchOn: React.Dispatch<React.SetStateAction<boolean>>;
  presentFolderSheet: () => void;
  setPosition?: React.Dispatch<React.SetStateAction<number>>;
  insightText: string;
  selectedFolder: string;
  challengeProgress: any;
}
const UploadBottomContainer = ({
  isSwitchOn,
  setIsSwitchOn,
  selectedFolder,
  presentFolderSheet,
  challengeProgress,
}: UploadBottomContainerProps) => {
  // console log the components height when it is rendered

  const theme = useTheme();

  const ProgressText = useMemo(() => {
    if (challengeProgress?.weekCompleted) return '이번주 챌린지를 완료했어요';
    if (challengeProgress?.todayRecorded) return '오늘 챌린지 기록을 완료했어요';
    return `${challengeProgress?.current}/${challengeProgress?.total}번째 기록 중`;
  }, [challengeProgress]);

  return (
    <View style={styles.container}>
      {challengeProgress && (
        <View style={styles.bottomContainer}>
          <View>
            <Text style={theme.fonts.text.body1.bold}>{challengeProgress.name}에 기록</Text>
            <Text style={theme.fonts.text.body2.regular}>{ProgressText}</Text>
          </View>
          <View>
            <Switch
              value={isSwitchOn}
              onValueChange={() => setIsSwitchOn((prev) => !prev)}
              color={'#b0e817'}
            />
          </View>
        </View>
      )}
      <Pressable style={styles.bottomContainer} onPress={presentFolderSheet}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ ...theme.fonts.text.body1.bold, fontSize: 16 }}>폴더</Text>
          <Text
            style={{
              fontFamily: 'pretendard',
              paddingRight: 12,
              color: selectedFolder !== '선택안함' ? '#486006' : '#12131480',
              fontSize: 16,
            }}
          >
            {selectedFolder ?? '선택안함'}
          </Text>
        </View>
        <View>
          <Feather name="chevron-right" size={24} color="black" />
        </View>
      </Pressable>
    </View>
  );
};

export default UploadBottomContainer;

const styles = StyleSheet.create({
  container: {
    marginBottom: 100,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
});
