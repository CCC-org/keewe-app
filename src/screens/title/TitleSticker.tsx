import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Title, TitleMeta } from '../../types/title/title';
import { useTheme } from 'react-native-paper';

interface TitleStickerProp {
  userTitles: Title['data']['achievedTitles'];
  titleMeta: TitleMeta;
  repTitleId: number | null;
}

const TitleSticker = ({ userTitles, titleMeta, repTitleId }: TitleStickerProp) => {
  const { fonts } = useTheme();
  const source = userTitles?.find((title) => title.titleId === titleMeta.id);

  return (
    <View style={styles.mainContainer}>
      {source ? (
        <>
          <Pressable
            style={{
              borderWidth: 1,
              borderColor: 'red',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => alert(titleMeta.id)}
          >
            <Image
              style={{
                width: 80,
                height: 80,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              // source={require(titleMeta.url)}
              source={titleMeta.url}
              // source={require('../../../assets/images/titles/666.png')}
            />
          </Pressable>
          <Text>{source.titleId}</Text>
        </>
      ) : (
        <>
          <Pressable
            style={{
              borderWidth: 1,
              borderColor: 'red',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => alert(titleMeta.id)}
          >
            <Image
              style={{
                width: 80,
                height: 80,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              // source={titleMeta.url}
              source={require('../../../assets/images/titles/666.png')}
            />
          </Pressable>
        </>
      )}

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
