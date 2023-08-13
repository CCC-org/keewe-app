import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import ColorSelectRadioButton from '../../components/buttons/ColorSelectRadioButton';
import ShareButton from '../../components/buttons/ShareButton';
import * as MediaLibrary from 'expo-media-library';
import ProfileAvatar from '../../components/profile/ProfileAvatar';
import { useTheme } from 'react-native-paper';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { SvgXml } from 'react-native-svg';
import { saveIcon } from '../../../assets/svgs/saveIcon.';
import ShareIconXml from '../../constants/Icons/DetailedPost/ShareIconXml';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import ShareOptions from '../../components/bottomsheet/ShareOptions';

const falseObject = {
  first: false,
  second: false,
  third: false,
};

const ShareScreen = ({ route }) => {
  const { insightId, challenge, order, image, name, insightText, recordText } = route.params;
  const modalRef = useRef<BottomSheetModal>(null);
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

      Toast.show({
        type: 'snackbar',
        text1: '이미지를 저장했어요.',
        position: 'bottom',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const shareImage = async () => {
    modalRef.current?.present();
  };

  const handleSelectColor = (position: string, color: string) => {
    setColor(color);
    setButtonColorSelected((prev) => {
      return { ...falseObject, [position]: true };
    });
  };

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    [],
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View ref={viewRef} style={[styles.container, { backgroundColor: color }]}>
        <View style={styles.profileContainer}>
          <Text
            style={{
              fontFamily: 'podkova',
              fontSize: 15,
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
            <ProfileAvatar style={{ marginRight: 8 }} size={36} image={image} />
            <View style={{ marginLeft: 8 }}>
              <Text
                style={[
                  theme.fonts.text.caption1,
                  { color: color === '#f1f1e9' ? '#12131480' : '#ffffff80' },
                ]}
              >
                {challenge ? `${name} 의` : `${name} 의 인사이트`}
              </Text>
              <Text
                style={[
                  theme.fonts.text.caption1,
                  { color: color === '#f1f1e9' ? '#12131480' : '#ffffff80' },
                ]}
              >
                {challenge
                  ? recordText?.length
                    ? `${challenge}에 대한 ${recordText}번째 인사이트`
                    : `${challenge}에 대한 인사이트`
                  : ''}
              </Text>
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
            <ShareButton text={'공유하기'} icon={<SvgXml xml={ShareIconXml} />} />
          </Pressable>
          <Pressable onPress={handleDownload}>
            <ShareButton text={'이미지 저장'} icon={<SvgXml xml={saveIcon} />} />
          </Pressable>
        </View>
      </View>
      <BottomSheetModal ref={modalRef} snapPoints={['20%']} backdropComponent={renderBackdrop}>
        <ShareOptions
          type={'insight'}
          id={insightId}
          message={`키위에서 '${name}' 님의 ${challenge}에 대한 ${recordText} 번째 인사이트 보기 '${insightText}'`}
        />
      </BottomSheetModal>
    </SafeAreaView>
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
