import { Pressable, StyleSheet } from 'react-native';
import React, { useCallback, useRef } from 'react';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useGetUserId } from '../../utils/hooks/useGetUserId';
import BSMyPostOptions from '../../components/bottomsheet/BSMyPostOptions';
import BSPostOptions from '../../components/bottomsheet/BSPostOptions';
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
          <BSMyPostOptions modalRef={modalRef} />
        ) : (
          <BSPostOptions
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
