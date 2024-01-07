import { Pressable, View } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useGetUserId } from '../../utils/hooks/useGetUserId';
import SheetMyPostOptions from '../../components/bottomsheet/SheetMyPostOptions';
import SheetPostOptions from '../../components/bottomsheet/SheetPostOptions';
import { SvgXml } from 'react-native-svg';
import { threeDots } from '../../../assets/svgs/constantSvgs/threeDots';
import { QueryClient } from '@tanstack/react-query';

interface FeedVerticalDotsProps {
  userId: number;
  insightId: number;
  userName: string;
  nickname?: string;
  title?: string;
  image?: string;
  contents?: string;
  link?: string;
  feedListQueryClient?: QueryClient;
}

const FeedVerticalDots = ({
  userId,
  userName,
  insightId,
  nickname,
  title,
  image,
  contents,
  link,
  feedListQueryClient,
}: FeedVerticalDotsProps) => {
  const myUserId = useGetUserId();
  const isMyPost = myUserId === userId;
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
    modalRef.current?.present();
  };
  return (
    <>
      <Pressable onPress={handleVerticalDotsPress}>
        <SvgXml xml={threeDots} />
      </Pressable>
      <BottomSheetModal
        ref={modalRef}
        snapPoints={[contentHeight, contentHeight, contentHeight]}
        backdropComponent={renderBackdrop}
      >
        <View onLayout={handleLayout}>
          {isMyPost ? (
            <SheetMyPostOptions
              modalRef={modalRef}
              userName={userName}
              userId={userId}
              insightId={insightId}
              nickname={nickname}
              title={title}
              image={image}
              contents={contents}
              link={link}
              feedListQueryClient={feedListQueryClient}
            />
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
            />
          )}
        </View>
      </BottomSheetModal>
    </>
  );
};

export default FeedVerticalDots;
