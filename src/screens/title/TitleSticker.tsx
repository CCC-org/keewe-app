import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Title, TitleMeta } from '../../types/title/title';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

interface TitleStickerProp {
  userTitles: Title['data']['achievedTitles'];
  titleMeta: TitleMeta;
  repTitleId: number | null;
}

const TitleSticker = ({ userTitles, titleMeta, repTitleId }: TitleStickerProp) => {
  const { fonts } = useTheme();
  const navigation = useNavigation();

  // source is the matching title. if undefined, the sticker will be an empty box.
  const source = userTitles?.find((title) => title.titleId === titleMeta.id);

  const handleChangeTitle = () => {
    if (!source) {
      alert('아직 획득하지 못한 타이틀은 등록할 수 없습니다.');
      return;
    }
    const res = navigation.getState().routes.filter((route) => route.name === 'ProfileEdit')[0];
    const mergedRouteParams = { ...res.params, title: titleMeta.name };
    navigation.navigate('ProfileEdit', mergedRouteParams);
  };

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
            onPress={handleChangeTitle}
          >
            <Image
              style={{
                width: 80,
                height: 80,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              source={titleMeta.url}
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
            onPress={handleChangeTitle}
          >
            <Image
              style={{
                width: 80,
                height: 80,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
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
