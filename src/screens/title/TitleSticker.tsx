import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Title, TitleMeta } from '../../types/title/title';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { modifyDateForTitleSticker } from '../../utils/helper/title/modifyDate';

interface TitleStickerProp {
  achievedTitles: Title['data']['achievedTitles'];
  titleMeta: TitleMeta;
  repTitleId: number | null;
  isEnteredByProfileEdit: boolean;
}

const TitleSticker = ({
  achievedTitles,
  titleMeta,
  repTitleId,
  isEnteredByProfileEdit,
}: TitleStickerProp) => {
  console.log('🚀 ~ file: TitleSticker.tsx:21 ~ repTitleId', repTitleId);
  const { fonts } = useTheme();
  const navigation = useNavigation();
  const tempRepTitleId = 2000;
  // source is t-+he matching title. if undefined, the sticker will be an empty box.
  const source = achievedTitles?.find((title) => {
    if (title.titleId === titleMeta.id) {
      return true;
    }
  });

  const handleChangeTitle = () => {
    if (!isEnteredByProfileEdit) {
      return;
    }
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
            {tempRepTitleId === source.titleId ? (
              <View>
                <Image source={require('../../../assets/images/titles/small_check.png')} />
                <Text>asdf</Text>
              </View>
            ) : null}
          </Pressable>
        </>
      ) : (
        <>
          <Pressable
            style={{
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
          <Text style={[fonts.text.caption1, { color: '#486006', textAlign: 'center' }]}>
            {modifyDateForTitleSticker(source.achievedDate)}
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
    margin: 10,
    width: 100,
  },
  metaContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
});
