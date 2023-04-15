import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useRef } from 'react';
import { Feather } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { getUserId } from '../../utils/hooks/asyncStorage/Login';
import { useGetUserId } from '../../utils/hooks/useGetUserId';
import SheetMyPostOptions from '../bottomsheet/SheetMyPostOptions';
import SheetPostOptions from '../bottomsheet/SheetPostOptions';
import SheetMyComment from './SheetMyComment';
import SheetOthersComment from './SheetOthersComment';

interface FeedVerticalDotsProps {
  userId: number | string;
  userName: string;
  commentId: number;
}

const CommentVerticalDots = ({ userId, userName, commentId }: FeedVerticalDotsProps) => {
  const myUserId = useGetUserId();
  const isMyComment = myUserId === userId;
  const modalRef = useRef<BottomSheetModal>(null);

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    [],
  );

  const handleVerticalDotsPress = () => {
    const { current } = modalRef;
    if (!current) return;
    if (isMyComment) {
      modalRef.current?.present();
    } else {
      modalRef.current?.present();
    }
  };
  return (
    <>
      <Pressable onPress={handleVerticalDotsPress}>
        <Feather name="more-vertical" size={24} color="black" />
      </Pressable>
      <BottomSheetModal
        ref={modalRef}
        snapPoints={['25%', '63%']}
        backdropComponent={renderBackdrop}
      >
        {isMyComment ? (
          <SheetMyComment modalRef={modalRef} />
        ) : (
          <SheetOthersComment
            modalRef={modalRef}
            userName={userName}
            userId={userId}
            commentId={commentId}
          />
        )}
      </BottomSheetModal>
    </>
  );
};

export default CommentVerticalDots;

const styles = StyleSheet.create({});
