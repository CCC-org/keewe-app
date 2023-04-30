import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
import ShareIconXml from '../../../constants/Icons/DetailedPost/ShareIconXml';
import { useTheme } from 'react-native-paper';
import { sharingXml } from '../../../../assets/svgs/sharingXml';
import { kakaoXml } from '../../../../assets/svgs/kakaoXml';

interface InviteOptionProps {
  xml: string;
  text: string;
  onPress: () => void;
}

const InviteOption = ({ xml, text, onPress }: InviteOptionProps) => {
  const theme = useTheme();
  return (
    <View style={{ alignItems: 'center' }}>
      <Pressable onPress={onPress}>
        <View style={{ ...styles.option, backgroundColor: theme.colors.brand.surface.container1 }}>
          <SvgXml xml={xml} />
        </View>
      </Pressable>
      <Text style={theme.fonts.text.body2.regular}>{text}</Text>
    </View>
  );
};

const InviteOptions = () => {
  return (
    <View style={styles.container}>
      <View style={styles.optionContainer}>
        <InviteOption xml={sharingXml} text={'공유하기'} onPress={() => alert('!')} />
        <InviteOption xml={kakaoXml} text={'문자 보내기'} onPress={() => alert('!')} />
        <InviteOption xml={ShareIconXml} text={'다른 앱'} onPress={() => alert('!')} />
      </View>
    </View>
  );
};

export default InviteOptions;

const styles = StyleSheet.create({
  container: {},
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 18,
  },
  option: {
    width: 64,
    height: 64,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
});
