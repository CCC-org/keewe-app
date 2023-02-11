import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import { Feather } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { getUserId } from '../../utils/hooks/asyncStorage/Login';
import { useGetUserId } from '../../utils/hooks/useGetUserId';

interface FeedVerticalDotsProps {
  userId: number;
}

const FeedVerticalDots = ({ userId }: FeedVerticalDotsProps) => {
  const myUserId = useGetUserId();
  const isMyPost = myUserId === userId;
  const modalRef = useRef<BottomSheetModal>(null);

  const handleVerticalDotsPress = () => {
    // alert(`id:${userId} vertical dots pressed!!`);
    modalRef.current?.present();
  };
  return (
    <>
      <Pressable onPress={handleVerticalDotsPress}>
        <Feather name="more-vertical" size={24} color="black" />
      </Pressable>
      <BottomSheetModal ref={modalRef} snapPoints={['25%', '50%', '75%']}>
        {isMyPost ? (
          <View>
            <Text>se</Text>
          </View>
        ) : (
          <View>
            <Text>Shit</Text>
          </View>
        )}
      </BottomSheetModal>
    </>
  );
};

export default FeedVerticalDots;

const styles = StyleSheet.create({});
