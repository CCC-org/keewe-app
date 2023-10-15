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
  source?: AchievedTitle;
  handleChangeTitle: () => void;
  editObject?: {
    nickname: string;
    image: string;
    title: string;
    introduction: string;
    selectedCategory: string[];
    toScreen: string;
  } | null;
}

const TitleSticker = ({ source, titleMeta, repTitleId, handleChangeTitle }: TitleStickerProp) => {
  const { fonts } = useTheme();
  // source is t-+he matching title. if undefined, the sticker will be an empty box.

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
            {repTitleId === source.titleId ? (
              <View style={styles.check}>
                <Image source={require('../../../assets/images/titles/small_check.png')} />
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
    margin: 5,
    width: 100,
  },
  metaContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 24,
  },
  check: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});
