import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Switch, useTheme } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

interface UploadBottomContainerProps {
  isSwitchOn: boolean;
  setIsSwitchOn: React.Dispatch<React.SetStateAction<boolean>>;
}
const UploadBottomContainer = ({ isSwitchOn, setIsSwitchOn }: UploadBottomContainerProps) => {
  // console log the components height when it is rendered
  const onLayout = (event: any) => {
    console.log('onLayout', event.nativeEvent.layout.height);
  };

  const theme = useTheme();
  return (
    <View style={styles.container} onLayout={onLayout}>
      <View style={styles.bottomContainer}>
        <View>
          <Text style={theme.fonts.text.body1.bold}>챌린지 명</Text>
          <Text style={theme.fonts.text.body2.regular}>6/12번째 기록 중</Text>
        </View>
        <View>
          <Switch
            value={isSwitchOn}
            onValueChange={() => setIsSwitchOn(!isSwitchOn)}
            style={styles.switch}
            color={'#b0e817'}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View>
          <Text style={theme.fonts.text.body1.bold}>폴더</Text>
        </View>
        <View>
          <Feather name="chevron-right" size={24} color="black" />
        </View>
      </View>
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
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
});
