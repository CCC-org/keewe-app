import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { FontText } from '../../components/texts/StyledText';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import ColorSelectRadioButton from '../../components/buttons/ColorSelectRadioButton';
import ShareButton from '../../components/buttons/ShareButton';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const falseObject = {
  first: false,
  second: false,
  third: false,
};

const ShareScreen = () => {
  const [color, setColor] = useState('#f1f1e9');
  const [buttonColorSelected, setButtonColorSelected] = useState({
    first: true,
    second: false,
    third: false,
  });
  const viewRef = useRef(null);

  const shareImage = async () => {
    const uri = await captureRef(viewRef, {
      format: 'png',
      quality: 1,
    });
    await Sharing.shareAsync(uri, { mimeType: 'image/jpg' });
  };

  const handleSelectColor = (position: string, color: string) => {
    setColor(color);
    setButtonColorSelected((prev) => {
      return { ...falseObject, [position]: true };
    });
  };

  return (
    <>
      <View ref={viewRef} style={[styles.container, { backgroundColor: color }]}>
        <View style={styles.profileContainer}></View>
        <ScrollView style={styles.textContainer}>
          <FontText
            style={{ ...styles.text, ...{ color: color === '#f1f1e9' ? 'black' : 'white' } }}
          >
            ShareScreenShareScreenShareScreenSha231312reScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenSha555reScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareSc123r123123ee5hareScreenShareScreenShareScreenShareScreenShareScreenShareScre123enS123hareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreen32ShareScreenShareScreenS321321hareScreenShare3213ScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareSc21312312reenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreen
          </FontText>
        </ScrollView>
      </View>
      <View style={styles.bottom}>
        <View style={styles.buttonContainer}>
          <Pressable onPress={() => handleSelectColor('first', '#f1f1e9')}>
            <ColorSelectRadioButton color="#f1f1e9" selected={buttonColorSelected.first} />
          </Pressable>
          <Pressable onPress={() => handleSelectColor('second', '#486006')}>
            <ColorSelectRadioButton color="#486006" selected={buttonColorSelected.second} />
          </Pressable>
          <Pressable onPress={() => handleSelectColor('third', 'rgba(18,19,20,0.8)')}>
            <ColorSelectRadioButton
              color="rgba(18,19,20,0.8)"
              selected={buttonColorSelected.third}
            />
          </Pressable>
        </View>

        <View style={styles.shareButtonContainer}>
          <Pressable onPress={shareImage}>
            <ShareButton
              text={'공유하기'}
              icon={<Feather name="share" size={24} color="black" />}
            />
          </Pressable>
          <Pressable>
            <ShareButton
              text={'이미지 저장'}
              icon={
                <MaterialCommunityIcons name="download-circle-outline" size={24} color="black" />
              }
            />
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default ShareScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0.6,
    backgroundColor: '#f1f1e9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 20,
  },
  profileContainer: {
    borderWidth: 1,
    height: 80,
    width: '100%',
  },
  textContainer: {
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '50%',
    padding: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  text: {
    fontWeight: '600',
    lineHeight: 32,
  },
  bottom: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '55%',
    marginTop: 20,
  },
});
