import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { useTitles } from '../../utils/hooks/title/useTitles';
import TitleSticker from './TitleSticker';
import { useTheme } from 'react-native-paper';
import { titleMap, titleMetaArr } from '../../constants/title/titleData';
import { getUserId } from '../../utils/hooks/asyncStorage/Login';

const TitleScreen = ({ route, navigation }) => {
  const userId = route.params?.userId ?? getUserId().then((id) => id);
  const isEnteredByProfileEdit: boolean = route.params?.isEnteredByProfileEdit ?? false;
  const [userTitles] = useTitles(userId);
  const [nickname] = useState<string>(route?.params?.nickname);
  const [image] = useState(route?.params?.image);
  const [title] = useState(route?.params?.title);
  const [introduction] = useState(route?.params?.introduction);
  const [selectedCategory] = useState(route?.params?.selectedCategory);
  const theme = useTheme();

  const editObject = {
    nickname: nickname,
    image: image,
    title: title,
    introduction: introduction,
    selectedCategory: selectedCategory,
    toScreen: 'ProfileEdit',
  };

  return (
    <ScrollView style={styles.mainContainer} contentContainerStyle={{ paddingBottom: 100 }}>
      {Object.values(titleMap).map((titleContainer) => {
        const filteredTitle = titleMetaArr.filter(
          (titleMeta) => titleMeta.category_kor === titleContainer.name,
        );
        return (
          <View key={titleContainer.name} style={styles.achievementContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[theme.fonts.text.headline2]}>{titleContainer.name}</Text>
              <Text
                style={[
                  theme.fonts.text.headline2,
                  { marginLeft: 6, color: '#18192060', marginBottom: 12 },
                ]}
              >
                {filteredTitle.length}
              </Text>
            </View>
            <View style={styles.titlesContainer}>
              {filteredTitle.map((titleMeta) => {
                return (
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  <TitleSticker
                    isEnteredByProfileEdit={isEnteredByProfileEdit}
                    key={titleMeta.id}
                    achievedTitles={userTitles.achievedTitles}
                    repTitleId={userTitles?.repTitleId}
                    titleMeta={titleMeta}
                    editObject={isEnteredByProfileEdit ? editObject : null}
                  />
                );
              })}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default TitleScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    paddingTop: 20,
    paddingLeft: 16,
  },
  achievementContainer: {
    paddingBottom: 8,
  },
  titlesContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingHorizontal: 12,
    marginBottom: 18,
  },
});
