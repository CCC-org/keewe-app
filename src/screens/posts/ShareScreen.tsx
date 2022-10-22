import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { FontText } from '../../components/texts/StyledText';
import { captureRef } from 'react-native-view-shot';
// import Share from 'react-native-share';
import * as Sharing from 'expo-sharing';

const ShareScreen = () => {
  const [color, setColor] = useState('#f1f1e9');
  const viewRef = useRef(null);

  const shareImage = async () => {
    const uri = await captureRef(viewRef, {
      format: 'png',
      quality: 0.8,
    });
    await Sharing.shareAsync(uri, { mimeType: 'image/png' });
  };

  return (
    <>
      <View ref={viewRef} style={[styles.container, { backgroundColor: color }]}>
        <View style={styles.profileContainer}></View>
        <ScrollView style={styles.textContainer}>
          <FontText
            style={{ ...styles.text, ...{ color: color === '#f1f1e9' ? 'black' : 'white' } }}
          >
            ShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreenShareScreen
          </FontText>
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => setColor('#f1f1e9')}>
          <FontText>01</FontText>
        </Pressable>
        <Pressable onPress={() => setColor('#486006')}>
          <FontText>02</FontText>
        </Pressable>
        <Pressable onPress={() => setColor('rgba(18,19,20,0.8)')}>
          <FontText>03</FontText>
        </Pressable>
      </View>

      <Pressable onPress={shareImage}>
        <Text>Share</Text>
      </Pressable>
    </>
  );
};

export default ShareScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    backgroundColor: '#f1f1e9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
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
    borderWidth: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  text: {
    fontWeight: '600',
    lineHeight: 32,
  },
});
