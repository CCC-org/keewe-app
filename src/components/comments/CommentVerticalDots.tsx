import { Pressable, View } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useGetUserId } from '../../utils/hooks/useGetUserId';
import SheetMyComment from './SheetMyComment';
import SheetOthersComment from './SheetOthersComment';

interface FeedVerticalDotsProps {
  userId: number | string;
  userName?: string;
  commentId: number;
}

const CommentVerticalDots = ({ userId, userName, commentId }: FeedVerticalDotsProps) => {
  const myUserId = useGetUserId();
  const isMyComment = myUserId === userId;
  const modalRef = useRef<BottomSheetModal>(null);

  const [contentHeight, setContentHeight] = useState<number>(300);

  const handleLayout = (event) => {
    const height = event.nativeEvent.layout.height;
    setContentHeight(height + 50);
  };

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
        snapPoints={[contentHeight, contentHeight, contentHeight + 200]}
        backdropComponent={renderBackdrop}
      >
        <View onLayout={handleLayout}>
          {isMyComment ? (
            <SheetMyComment modalRef={modalRef} commentId={commentId} />
          ) : (
            <SheetOthersComment
              modalRef={modalRef}
              userName={userName}
              userId={userId}
              commentId={commentId}
            />
          )}
        </View>
      </BottomSheetModal>
    </>
  );
};

export default CommentVerticalDots;
