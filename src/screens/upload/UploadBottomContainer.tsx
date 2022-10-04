import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Switch, useTheme } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

interface UploadBottomContainerProps {
  isSwitchOn: boolean;
  setIsSwitchOn: React.Dispatch<React.SetStateAction<boolean>>;
  presentFolderSheet: () => void;
  setPosition?: React.Dispatch<React.SetStateAction<number>>;
  insightText: string;
  selectedFolder: string;
}
const UploadBottomContainer = ({
  isSwitchOn,
  setIsSwitchOn,
  selectedFolder,
  presentFolderSheet,
}: UploadBottomContainerProps) => {
  // console log the components height when it is rendered

  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.bottomContainer}>
        <View>
          <Text style={theme.fonts.text.body1.bold}>챌린지 명</Text>
          <Text style={theme.fonts.text.body2.regular}>6/12번째 기록 중</Text>
        </View>
        <View>
          <Switch
            value={isSwitchOn}
            onValueChange={() => setIsSwitchOn(!isSwitchOn)}
            color={'#b0e817'}
          />
        </View>
      </View>
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
            style={{ fontFamily: 'pretendard', paddingRight: 12, color: '#486006', fontSize: 16 }}
          >
            {selectedFolder}
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
