import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { titleInfo, titleMeta } from '../../types/title/title';

interface TitleStickerProp {
  userTitles: titleInfo[];
  titleMeta: titleMeta;
}

const TitleSticker = ({ userTitles, titleMeta }: TitleStickerProp) => {
  // console.log(
  //   '🚀 ~ file: TitleSticker.tsx:11 ~ TitleSticker ~ userTitles, titleMeta',
  //   userTitles,
  //   titleMeta,
  // );
  return (
    <View>
      <Image
        style={{
          borderWidth: 10,
          width: '100%',
          height: 100,
        }}
        // source={{ uri: `../../../assets/images/titles/${titleMeta.id}.png` }}
        source={{ uri: `../../../assets/images/챌린지/챌린지생성.png` }}
        // source={require(`../../../assets/images/titles/1000.png`)}
      />

      <Text>what</Text>
    </View>
  );
};

export default TitleSticker;

const styles = StyleSheet.create({});
