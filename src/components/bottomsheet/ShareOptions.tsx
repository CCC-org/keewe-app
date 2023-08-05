import { Linking, StyleSheet, View } from 'react-native';
import React from 'react';
import copyLinkXml from '../../../assets/svgs/copyLinkXml';
import messageXml from '../../../assets/svgs/messageXml';
import * as Clipboard from 'expo-clipboard';
import Option from './Option';
import Toast from 'react-native-toast-message';

interface ShareOptionsProps {
  type: string;
  id: number;
  message: string;
}

const ShareOptions = ({ type, id, message }: ShareOptionsProps) => {
  const handleSendSMS = () => {
    const url = `https://keewe.kr/link/${type}/${id}`;
    const SMSURL = `sms:&body=${encodeURIComponent(message + '\n\n' + url)}`;
    Linking.openURL(SMSURL);
  };

  const handleShare = async () => {
    await Clipboard.setStringAsync(`https://keewe.kr/link/${type}/${id}`);
    Toast.show({
      type: 'snackbar',
      text1: '클립보드에 복사했어요.',
      position: 'bottom',
    });
  };

  return (
    <View style={styles.optionContainer}>
      <Option xml={copyLinkXml} text={'링크 복사'} onPress={handleShare} />
      <Option
        xml={messageXml}
        text={'문자 보내기'}
        onPress={handleSendSMS}
        backgroundColor={'#24CE54'}
      />
    </View>
  );
};

export default ShareOptions;

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 18,
  },
  option: {
    width: 64,
    height: 64,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    marginHorizontal: 22,
  },
});
