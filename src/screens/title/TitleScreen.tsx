import { StyleSheet, Text, View, ScrollView, SafeAreaView, Pressable } from 'react-native';
import React, { useState, useRef, useCallback, useLayoutEffect, useMemo, useEffect } from 'react';
import { useTitles } from '../../utils/hooks/title/useTitles';
import TitleSticker from './TitleSticker';
import { useTheme } from 'react-native-paper';
import { titleMap, titleMetaArr } from '../../constants/title/titleData';
import { getUserId } from '../../utils/hooks/asyncStorage/Login';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import HeaderBackButton from '../../components/header/HeaderBackButton';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import filter from '../../../assets/svgs/filter';
import { SvgXml } from 'react-native-svg';

const TitleScreen = ({ route, navigation }) => {
  const paramsId = route.params?.userId;
  const [isSelf, setIsSelf] = useState<boolean>(false);
  const isEnteredByProfileEdit: boolean = route.params?.isEnteredByProfileEdit ?? false;
  const [userTitles] = useTitles(paramsId);
  const [repTitleId, setRepTitleId] = useState<number | undefined>(route?.params?.repTitleId);
  const [nickname] = useState<string>(route?.params?.nickname);
  const [image] = useState(route?.params?.image);
  const [title, setTitle] = useState(route?.params?.title);
  const [introduction] = useState(route?.params?.introduction);
  const [selectedCategory] = useState(route?.params?.selectedCategory);
  const [customCategory] = useState(route?.params?.customCategory);
  const [selectedTitle, setSelectedTitle] = useState<AchievedTitle | undefined>();
  const [filterMode, setFilterMode] = useState<string>('total');
  const theme = useTheme();

  const modalRef = useRef<BottomSheetModal>(null);
  const filterModalRef = useRef<BottomSheetModal>(null);

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
    if (!isEnteredByProfileEdit || isSelf) {
      navigation.goBack();
      return;
    }
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
      headerRight: () => (
        <Pressable
          onPress={() => {
            filterModalRef.current?.present();
            return;
          }}
          style={{ padding: 12 }}
        >
          <SvgXml xml={filter} />
        </Pressable>
      ),
      headerLeft: () => <HeaderBackButton onPress={handleBackPress} />,
    });
  }, [route, repTitleId, selectedTitle, title]);

  useEffect(() => {
    const userId = getUserId();
    setIsSelf(paramsId == userId);
  }, [paramsId, getUserId]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.mainContainer} contentContainerStyle={{ paddingBottom: 100 }}>
        {Object.values(titleMap).map((titleContainer) => {
          let filteredTitle = titleMetaArr.filter(
            (titleMeta) => titleMeta.category_kor === titleContainer.name,
          );
          if (filterMode === 'aquire') {
            filteredTitle = filteredTitle.filter((titleMeta) =>
              userTitles.achievedTitles?.find((title) => title.titleId === titleMeta.id),
            );
          }
          if (filteredTitle.length == 0) return;
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
                  console.log('titleMeta', titleMeta);
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
                      repTitleId={isSelf ? repTitleId ?? userTitles.repTitleId : undefined}
                      titleMeta={titleMeta}
                      handleChangeTitle={() => {
                        if (!isEnteredByProfileEdit) {
                          return;
                        }
                        if (!source) {
                          Toast.show({
                            type: 'snackbar',
                            text1: '아직 획득하지 못한 타이틀은 등록할 수 없어요.',
                            position: 'bottom',
                          });
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
      <BottomSheetModal
        ref={filterModalRef}
        snapPoints={['22%']}
        backdropComponent={renderBackdrop}
      >
        <Pressable
          style={styles.option}
          onPress={() => {
            setFilterMode('total');
            Toast.show({
              type: 'snackbar',
              text1: '전체 타이틀이 보여요.',
              position: 'bottom',
            });
            filterModalRef.current?.dismiss();
          }}
        >
          <Text style={[theme.fonts.text.body1.regular]}>전체 타이틀 보기</Text>
        </Pressable>
        <Pressable
          style={styles.option}
          onPress={() => {
            setFilterMode('aquire');
            Toast.show({
              type: 'snackbar',
              text1: '획득한 타이틀만 보여요.',
              position: 'bottom',
            });
            filterModalRef.current?.dismiss();
          }}
        >
          <Text style={[theme.fonts.text.body1.regular]}>획득한 타이틀만 보기</Text>
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
