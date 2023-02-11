import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

interface BSMyPostOptionsProps {
  modalRef: React.RefObject<BottomSheetModalMethods>;
}

const BSMyPostOptions = ({ modalRef }: BSMyPostOptionsProps) => {
  return (
    <View>
      <Text>BSMyPostOptions</Text>
    </View>
  );
};

export default BSMyPostOptions;

const styles = StyleSheet.create({});
