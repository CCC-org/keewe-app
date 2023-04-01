import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import ColorSelectRadioButton from '../../components/buttons/ColorSelectRadioButton';
import ShareButton from '../../components/buttons/ShareButton';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import ProfileAvatar from '../../components/profile/ProfileAvatar';
import { useTheme } from 'react-native-paper';

const falseObject = {
  first: false,
  second: false,
  third: false,
};

const ShareScreen = ({ route }) => {
  const { challenge, image, name, insightText } = route.params;
  const [color, setColor] = useState('#f1f1e9');
  const [buttonColorSelected, setButtonColorSelected] = useState({
    first: true,
    second: false,
    third: false,
  });
  const viewRef = useRef(null);
  const theme = useTheme();
  const handleDownload = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'jpg',
        quality: 1,
      });
      const permissionResponse = await MediaLibrary.getPermissionsAsync();

      if (permissionResponse.status === 'granted') {
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync('Keewe', asset, false);
      }
    } catch (error) {
      alert(error);
    }
  };

  const shareImage = async () => {
    const uri = await captureRef(viewRef, {
      format: 'png',
      quality: 1,
    });
    await Sharing.shareAsync('file://' + uri, {
      mimeType: 'image/jpg',
      UTI: 'image/jpeg',
    });
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
        <View style={styles.profileContainer}>
          <Text
            style={{
              fontFamily: 'pretendardMedium',
              fontSize: 14,
              color: color === '#f1f1e9' ? '#486006' : '#e0f6a2',
            }}
          >
            Keewe
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingTop: 10,
            }}
          >
            <ProfileAvatar style={{ marginRight: 10 }} size={36} image={image} />
            <View>
              <Text
                style={[
                  theme.fonts.text.caption1,
                  { color: color === '#f1f1e9' ? '#12131450' : '#ffffff50' },
                ]}
              >{`${name} 의`}</Text>
              <Text
                style={{
                  fontFamily: 'pretendardSemiBold',
                  fontSize: 12,
                  color: color === '#f1f1e9' ? '#12131450' : '#ffffff50',
                }}
              >{`${challenge}에 대한 인사이트`}</Text>
            </View>
          </View>
        </View>
        <ScrollView style={styles.textContainer}>
          <Text
            style={{
              ...theme.fonts.text.ridi,
              ...{
                color: color === '#f1f1e9' ? 'black' : 'white',
                marginTop: 4,
              },
            }}
          >
            {insightText}
          </Text>
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
          <Pressable onPress={handleDownload}>
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
    height: 80,
    width: '100%',
  },
  textContainer: { width: '100%', height: '100%' },
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
    fontSize: 18,
    fontFamily: 'ridiBatang',
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
