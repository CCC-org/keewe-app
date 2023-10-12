import { StyleSheet, Text, View, ScrollView, SafeAreaView, Pressable } from 'react-native';
import React, { useState, useRef, useCallback, useLayoutEffect, useMemo } from 'react';
import { useTitles } from '../../utils/hooks/title/useTitles';
import TitleSticker from './TitleSticker';
import { useTheme } from 'react-native-paper';
import { titleMap, titleMetaArr } from '../../constants/title/titleData';
import { getUserId } from '../../utils/hooks/asyncStorage/Login';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import HeaderBackButton from '../../components/header/HeaderBackButton';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const TitleScreen = ({ route, navigation }) => {
  const userId = route.params?.userId ?? getUserId().then((id) => id);
  const isEnteredByProfileEdit: boolean = route.params?.isEnteredByProfileEdit ?? false;
  const [userTitles] = useTitles(userId);
  const [repTitleId, setRepTitleId] = useState<number | undefined>(route?.params?.repTitleId);
  const [nickname] = useState<string>(route?.params?.nickname);
  const [image] = useState(route?.params?.image);
  const [title, setTitle] = useState(route?.params?.title);
  const [introduction] = useState(route?.params?.introduction);
  const [selectedCategory] = useState(route?.params?.selectedCategory);
  const [customCategory] = useState(route?.params?.customCategory);
  const [selectedTitle, setSelectedTitle] = useState<AchievedTitle | undefined>();
  const theme = useTheme();

  const modalRef = useRef<BottomSheetModal>(null);

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    [],
  );

  const handleTitleApply = useCallback(() => {
    setTitle(selectedTitle?.name);
    setRepTitleId(selectedTitle?.titleId);
    Toast.show({
      type: 'snackbar',
      text1: '대표 타이틀이 변경되었어요.',
      position: 'bottom',
    });
    modalRef.current?.dismiss();
  }, [selectedTitle]);

  const editObject = {
    nickname,
    image,
    title,
    introduction,
    selectedCategory,
    customCategory,
    toScreen: 'ProfileEdit',
  };

  const handleBackPress = () => {
    const res = navigation.getState().routes.filter((route) => route.name === 'ProfileEdit')[0];
    const mergedRouteParams = {
      ...res.params,
      ...editObject,
      title,
      repTitleId,
    };
    navigation.navigate('ProfileEdit', mergedRouteParams);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <></>,
      headerLeft: () => <HeaderBackButton onPress={handleBackPress} />,
    });
  }, [route, repTitleId, selectedTitle, title]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
                  const source = userTitles.achievedTitles?.find((title) => {
                    if (title.titleId === titleMeta.id) {
                      return true;
                    }
                  });
                  return (
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    <TitleSticker
                      source={source}
                      isEnteredByProfileEdit={isEnteredByProfileEdit}
                      key={titleMeta.id}
                      achievedTitles={userTitles.achievedTitles}
                      repTitleId={repTitleId ?? userTitles.repTitleId}
                      titleMeta={titleMeta}
                      handleChangeTitle={() => {
                        if (!isEnteredByProfileEdit) {
                          return;
                        }
                        if (!source) {
                          alert('아직 획득하지 못한 타이틀은 등록할 수 없습니다.');
                          return;
                        }
                        setSelectedTitle(source);
                        modalRef.current?.present();
                      }}
                      editObject={isEnteredByProfileEdit ? editObject : null}
                    />
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
      <BottomSheetModal ref={modalRef} snapPoints={['15%']} backdropComponent={renderBackdrop}>
        <Pressable style={styles.option} onPress={handleTitleApply}>
          <Text style={[theme.fonts.text.body1.regular]}>대표 타이틀 설정</Text>
        </Pressable>
      </BottomSheetModal>
    </SafeAreaView>
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
  option: {
    padding: 18,
  },
});
