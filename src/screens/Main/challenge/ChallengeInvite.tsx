import { View, Pressable, StyleSheet, Text, TextInput } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SvgXml } from 'react-native-svg';
import { addFriend } from '../../../../assets/svgs/addFriend';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import InviteOptions from './InviteOptions';
import { useTheme } from 'react-native-paper';
import FollowersAndFollowings from './FollowersAndFollowings';
import { clearInput } from '../../../../assets/svgs/clearInput';

const ChallengeInvite = () => {
  const theme = useTheme();
  const modalRef = useRef<BottomSheetModal>(null);
  const [onSearch, setOnSearch] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    [],
  );

  const handlePress = () => {
    modalRef.current?.present();
    setOnSearch(false);
  };

  useEffect(() => {
    if (searchValue.length > 0) setIsButtonEnabled(true);
    else setIsButtonEnabled(false);
  }, [searchValue]);

  const dummy = [
    {
      id: 1,
      nickname: '헬로우',
      imageURL: 'www.api-keewe.com/images/128398681',
    },
    {
      id: 2,
      nickname: '디즈니',
      imageURL: 'www.api-keewe.com/images/128398681',
    },
    {
      id: 3,
      nickname: '쥬라기',
      imageURL: 'www.api-keewe.com/images/128398681',
    },
    {
      id: 4,
      nickname: '월드',
      imageURL: 'www.api-keewe.com/images/128398681',
    },
    {
      id: 5,
      nickname: '키위새',
      imageURL: 'www.api-keewe.com/images/128398681',
    },
  ];

  const handleGoSearch = () => {
    modalRef.current?.snapToIndex(1);
    setOnSearch(true);
  };

  const handleSearchCancel = () => {
    modalRef.current?.dismiss();
  };

  const handleChangeText = (inputValue: string) => {
    setSearchValue(inputValue);
  };

  return (
    <>
      <Pressable style={{ marginRight: 19 }} onPress={handlePress}>
        <SvgXml xml={addFriend} />
      </Pressable>
      <BottomSheetModal
        ref={modalRef}
        snapPoints={['50%', '85%']}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetScrollView>
          {onSearch ? null : <InviteOptions />}
          <View style={{ marginHorizontal: 16 }}>
            {onSearch ? (
              <View style={styles.onSearchHeader}>
                <TextInput
                  autoFocus={true}
                  value={searchValue}
                  onChangeText={handleChangeText}
                  style={{ ...styles.searchBox, borderColor: `${theme.colors.graphic.black}1a` }}
                ></TextInput>
                <Pressable onPress={handleSearchCancel}>
                  <Text
                    style={{
                      ...theme.fonts.text.body1.bold,
                      color: `${theme.colors.graphic.black}80`,
                    }}
                  >
                    취소
                  </Text>
                </Pressable>
              </View>
            ) : (
              <Pressable
                onPress={handleGoSearch}
                style={{ ...styles.search, borderColor: `${theme.colors.graphic.black}1a` }}
              >
                <Text
                  style={{
                    ...theme.fonts.text.body1.regular,
                    color: `${theme.colors.graphic.black}80`,
                  }}
                >
                  팔로잉/팔로워 검색
                </Text>
              </Pressable>
            )}
            <FollowersAndFollowings users={dummy} />
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </>
  );
};

export default ChallengeInvite;

const styles = StyleSheet.create({
  search: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: 'center',
  },
  onSearchHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchBox: {
    width: '85%',
    height: 44,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});
