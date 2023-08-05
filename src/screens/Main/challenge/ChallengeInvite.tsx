import { Pressable } from 'react-native';
import React, { useCallback, useRef } from 'react';
import { SvgXml } from 'react-native-svg';
import { addFriend } from '../../../../assets/svgs/addFriend';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import ChallengeInviteOption from '../../../components/bottomsheet/ChallengeInviteOption';

interface ChallengeInviteProps {
  challengeId: number;
  challengeName: string;
}

const ChallengeInvite = ({ challengeId, challengeName }: ChallengeInviteProps) => {
  const modalRef = useRef<BottomSheetModal>(null);
  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    [],
  );

  const handlePress = () => {
    modalRef.current?.present();
  };

  const onSearch = () => {
    modalRef.current?.snapToIndex(1);
  };

  const onCancel = () => {
    modalRef.current?.dismiss();
  };

  return (
    <>
      <Pressable style={{ marginRight: 17, marginTop: 4 }} onPress={handlePress}>
        <SvgXml xml={addFriend} />
      </Pressable>
      <BottomSheetModal
        ref={modalRef}
        snapPoints={['50%', '85%']}
        backdropComponent={renderBackdrop}
      >
        <ChallengeInviteOption
          challengeId={challengeId}
          challengeName={challengeName}
          onSearch={onSearch}
          onCancel={onCancel}
        />
      </BottomSheetModal>
    </>
  );
};

export default ChallengeInvite;
