import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { titleInfo, titleMeta } from '../../types/title/title';
import { useTheme } from 'react-native-paper';

interface TitleStickerProp {
  userTitles: titleInfo[];
  titleMeta: titleMeta;
}

const TitleSticker = ({ userTitles, titleMeta }: TitleStickerProp) => {
  console.log('🚀 ~ file: TitleSticker.tsx:12 ~ TitleSticker ~ userTitles', userTitles);
  const { fonts } = useTheme();
  // TODO: userTitles에 있으면, id를 source로 받고, 아니면 666이 들어감.
  // 666은 없는 이미지를 의미함.
  const source = userTitles.find((title) => title.titleId === titleMeta.id);
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'red',
        }}
      >
        <Image
          style={{
            borderWidth: 10,
            width: 80,
            height: 80,
          }}
          source={{ uri: `../../../assets/images/titles/${source || 666}.png` }}
        />
      </View>

      <View style={styles.metaContainer}>
        <Text style={[fonts.text.body2.bold, { textAlign: 'center' }]}>{titleMeta.name}</Text>
        <Text style={[fonts.text.caption1, { color: '#18192090', textAlign: 'center' }]}>
          {titleMeta.introduction}
        </Text>
        {source ? (
          <Text style={[fonts.text.caption1, { color: '#18192090', textAlign: 'center' }]}>
            {source.achievedDate}
          </Text>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default TitleSticker;

const styles = StyleSheet.create({
  mainContainer: {
    borderWidth: 1,
    borderColor: 'green',
    margin: 10,
    width: 100,
  },
  metaContainer: {
    borderWidth: 1,
    borderColor: 'yellow',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
});
