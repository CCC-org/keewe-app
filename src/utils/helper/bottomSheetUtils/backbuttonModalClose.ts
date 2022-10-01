import { useEffect } from 'react';
import { BackHandler } from 'react-native';

/**
 * @description This function is used to close the modal when the Android hardware back button is pressed
 *
 * @param {BottomSheetModal} modalRef - BottomSheet Element Reference that has close method
 */
export function backButtonModalClose(modalRef) {
  useEffect(() => {
    const backAction = () => {
      modalRef.current?.close();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);
}
