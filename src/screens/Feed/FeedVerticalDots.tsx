import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useRef } from 'react';
import { Feather } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { getUserId } from '../../utils/hooks/asyncStorage/Login';
import { useGetUserId } from '../../utils/hooks/useGetUserId';
import BSMyPostOptions from '../../components/bottomsheet/BSMyPostOptions';
import BSPostOptions from '../../components/bottomsheet/BSPostOptions';

interface FeedVerticalDotsProps {
  userId: number;
}

const FeedVerticalDots = ({ userId }: FeedVerticalDotsProps) => {
  const myUserId = useGetUserId();
  const isMyPost = myUserId === userId;
  const modalRef = useRef<BottomSheetModal>(null);

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    [],
  );

  const handleVerticalDotsPress = () => {
    modalRef.current?.present();
  };
  return (
    <>
      <Pressable onPress={handleVerticalDotsPress}>
        <Feather name="more-vertical" size={24} color="black" />
      </Pressable>
      <BottomSheetModal
        ref={modalRef}
        snapPoints={['25%', '65%', '90%']}
        backdropComponent={renderBackdrop}
      >
        {isMyPost ? <BSMyPostOptions modalRef={modalRef} /> : <BSPostOptions modalRef={modalRef} />}
      </BottomSheetModal>
    </>
  );
};

export default FeedVerticalDots;

const styles = StyleSheet.create({});
