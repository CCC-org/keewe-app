import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { RidiText } from '../../components/texts/StyledText';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import ColorSelectRadioButton from '../../components/buttons/ColorSelectRadioButton';
import ShareButton from '../../components/buttons/ShareButton';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import { downloadToFolder } from 'expo-file-dl';

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

  const handleDownload = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'jpg',
        quality: 1,
      });
      const permissionResponse = await MediaLibrary.getPermissionsAsync();
      console.log('per', permissionResponse);

      if (permissionResponse.status === 'granted') {
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync('Keewe', asset, false);
        // console.log('asset: ', asset);
        // await downloadToFolder(uri, String(new Date().getTime()), 'Keewe', 'image/jpeg');
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
          <RidiText
            style={{ ...styles.text, ...{ color: color === '#f1f1e9' ? 'black' : 'white' } }}
          >
            난 너를 믿었던 만큼 내 친구도 믿었기에 난 아무런 부담없이 널 내 친구에게 소개시켜줬고
            그런 만남이 있은후부터 우린 자주 함께 만나며 즐거운 시간을 보내며 함께 어울렸던 것
            뿐인데 그런 만남이 어디부터 잘못됐는지 난 알수없는 예감에 조금씩 빠져들고 있을때쯤 넌
            나보다 내 친구에게 관심을 더 보이며 날 조금씩 멀리하던 그 어느날 너와 내가 심하게 다툰
            그 날 이후로 너와 내 친구는 연락도 없고 날 피하는 것 같아 그제서야 난 느낀거야 모든것이
            잘못 되있는걸 너와 내 친구는 어느새 다정한 연인이 되있었지 있을 수 없는 일이라며 난
            울었어 내 사랑과 우정을 모두 버려야 했기에 또다른 내 친구는 내 어깰 두드리며 잊어버리라
            했지만 잊지 못할 것 같아 너를 사랑했던 것만큼 난 내 친구도 믿었기에 난 자연스럽게 너와
            함께 어울렸던 것뿐인데 어디서부터 우리의 믿음이 깨지기 시작했는지 난 알지도 못한채
            어색함을 느끼면서 그렇게 함께 만나온 시간이 길어지면 질수록 넌 내게서 조금씩 멀어지는
            것을 느끼며 난 예감을 했었지 넌 나보다 내 친구에게 관심이 더 있었다는 걸 그 어느날 너와
            내가 심하게 다툰 그날 이후로 너와 내 친구는 연락도 없고 날 피하는 것같아 그제서야 난
            느낀거야 모든것이 잘못돼있는걸 너와 내 친구는 어느새 다정한 연인이 돼있었지 있을 수 없는
            일이라며 난 울었어 내 사랑과 우정을 모두 버려야 했기에 또다른 내 친구는 내 어깰 두드리며
            잊어버리라 했지만 잊지 못할것 같아
          </RidiText>
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
    fontSize: 18,
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
