import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useRef } from 'react';
import { Feather } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { getUserId } from '../../utils/hooks/asyncStorage/Login';
import { useGetUserId } from '../../utils/hooks/useGetUserId';
import SheetMyPostOptions from '../../components/bottomsheet/SheetMyPostOptions';
import SheetPostOptions from '../../components/bottomsheet/SheetPostOptions';
import { SvgXml } from 'react-native-svg';
import { threeDots } from '../../../assets/svgs/constantSvgs/threeDots';

interface FeedVerticalDotsProps {
  userId: number;
  insightId: number;
  userName: string;
}

const FeedVerticalDots = ({ userId, userName, insightId }: FeedVerticalDotsProps) => {
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
        <SvgXml xml={threeDots} />
      </Pressable>
      <BottomSheetModal
        ref={modalRef}
        snapPoints={['25%', '65%', '90%']}
        backdropComponent={renderBackdrop}
      >
        {isMyPost ? (
          <SheetMyPostOptions modalRef={modalRef} />
        ) : (
          <SheetPostOptions
            modalRef={modalRef}
            userName={userName}
            userId={userId}
            insightId={insightId}
          />
        )}
      </BottomSheetModal>
    </>
  );
};

export default FeedVerticalDots;

const styles = StyleSheet.create({});
