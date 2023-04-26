import { Pressable, StyleSheet } from 'react-native';
import React, { useCallback, useRef } from 'react';
import { SvgXml } from 'react-native-svg';
import { addFriend } from '../../../../assets/svgs/addFriend';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { View } from '../../../components/Themed';

const ChallengeInvite = () => {
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
        <View></View>
      </BottomSheetModal>
    </>
  );
};

export default ChallengeInvite;

const styles = StyleSheet.create({});
