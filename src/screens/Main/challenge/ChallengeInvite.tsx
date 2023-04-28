import { View, Pressable, StyleSheet, Text } from 'react-native';
import React, { useCallback, useRef } from 'react';
import { SvgXml } from 'react-native-svg';
import { addFriend } from '../../../../assets/svgs/addFriend';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import InviteOptions from './InviteOptions';
import { useTheme } from 'react-native-paper';
import FollowersAndFollowings from './FollowersAndFollowings';

const ChallengeInvite = () => {
  const theme = useTheme();
  const modalRef = useRef<BottomSheetModal>(null);

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    [],
  );

  const handlePress = () => {
    modalRef.current?.present();
  };

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
      nickname: '덤덤',
      imageURL: 'www.api-keewe.com/images/128398681',
    },
  ];
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
          <InviteOptions />
          <View style={{ marginHorizontal: 16 }}>
            <Pressable
              onPress={() => alert('search')}
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
});
