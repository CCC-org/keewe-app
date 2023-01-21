import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { titleInfo, titleMeta } from '../../types/title/title';
import { useTheme } from 'react-native-paper';

interface TitleStickerProp {
  userTitles: titleInfo[];
  titleMeta: titleMeta;
}

const TitleSticker = ({ userTitles, titleMeta }: TitleStickerProp) => {
  const { fonts } = useTheme();
  // TODO: userTitles에 있으면, id를 source로 받고, 아니면 666이 들어감.
  // 666은 없는 이미지를 의미함.
  const source = userTitles.find((title) => title.titleId === titleMeta.id);
  console.log('🚀 ~ file: TitleSticker.tsx:16 ~ TitleSticker ~ source', source);
  console.log('🚀 ~ file: TitleSticker.tsx:19 ~ TitleSticker ~ titleMeta.url', titleMeta.url);
  return (
    <View style={styles.mainContainer}>
      <Pressable
        style={{
          borderWidth: 1,
          borderColor: 'red',
        }}
        onPress={() => alert(titleMeta.id)}
      >
        {source ? (
          <>
            <Image
              style={{
                width: 80,
                height: 80,
              }}
              // source={require(titleMeta.url)}
              source={titleMeta.url}
              // source={require('../../../assets/images/titles/666.png')}
            />
            <Text>{source.titleId}</Text>
          </>
        ) : (
          <>
            <Image
              style={{
                width: 80,
                height: 80,
              }}
              // source={titleMeta.url}
              source={require('../../../assets/images/titles/666.png')}
            />
            <Text>666</Text>
            <Text>{titleMeta.id}</Text>
          </>
        )}
      </Pressable>

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
