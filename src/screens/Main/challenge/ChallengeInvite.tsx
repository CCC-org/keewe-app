import { View, Pressable, StyleSheet, Text } from 'react-native';
import React, { useCallback, useRef } from 'react';
import { SvgXml } from 'react-native-svg';
import { addFriend } from '../../../../assets/svgs/addFriend';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import InviteOptions from './InviteOptions';
import { useTheme } from 'react-native-paper';

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
        <InviteOptions />
        <View style={{ ...styles.search, borderColor: `${theme.colors.graphic.black}1a` }}>
          <Text
            style={{ ...theme.fonts.text.body1.regular, color: `${theme.colors.graphic.black}80` }}
          >
            팔로잉/팔로워 검색
          </Text>
        </View>
      </BottomSheetModal>
    </>
  );
};

export default ChallengeInvite;

const styles = StyleSheet.create({
  search: {
    marginHorizontal: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: 'center',
  },
});
