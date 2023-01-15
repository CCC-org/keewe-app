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
                width: 160,
                height: 160,
              }}
              width={160}
              height={160}
              source={require(`../../../assets/images/titles/1000.png`)}
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
              // source={require('../../../assets/images/titles/666.png')}
              source={require('../../../assets/images/챌린지/챌린지생성.png')}
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
