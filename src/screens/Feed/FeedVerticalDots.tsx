import { Pressable, StyleSheet } from 'react-native';
import React, { useCallback, useRef } from 'react';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useGetUserId } from '../../utils/hooks/useGetUserId';
import SheetMyPostOptions from '../../components/bottomsheet/SheetMyPostOptions';
import SheetPostOptions from '../../components/bottomsheet/SheetPostOptions';
import { SvgXml } from 'react-native-svg';
import { threeDots } from '../../../assets/svgs/constantSvgs/threeDots';

interface FeedVerticalDotsProps {
  userId: number;
  insightId: number;
  userName: string;
  nickname?: string;
  title?: string;
  image?: string;
  contents?: string;
  challenge?: string;
}

const FeedVerticalDots = ({
  userId,
  userName,
  insightId,
  nickname,
  title,
  image,
  contents,
  challenge,
}: FeedVerticalDotsProps) => {
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
        snapPoints={['30%', '50%']}
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
            nickname={nickname}
            title={title}
            image={image}
            contents={contents}
            challenge={challenge}
          />
        )}
      </BottomSheetModal>
    </>
  );
};

export default FeedVerticalDots;

const styles = StyleSheet.create({});
