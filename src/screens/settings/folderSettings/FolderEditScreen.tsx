import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { MypageAPI, MypageQueryKeys } from '../../../utils/api/mypageAPI';
import { useGetUserId } from '../../../utils/hooks/useGetUserId';
import MainLottie from '../../../components/lotties/MainLottie';
import FolderEditSection from './FolderEditSection';
import { SvgXml } from 'react-native-svg';
import { plus } from '../../../constants/Icons/plus/plus';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import BottomSheetHeader from '../../../components/header/BottomSheetHeader';
import HeaderRightButton from '../../../components/header/HeaderRightButton';
import BlandTextInput from '../../../components/texts/BlandTextInput';
import { UploadApis } from '../../../utils/api/UploadAPIs';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const FolderEditScreen = ({ navigation }) => {
  const userId = useGetUserId();
  const {
    data: userFolderList,
    isLoading,
    ...folderListQuery
  } = useQuery({
    queryKey: MypageQueryKeys.getNonModifiedList({ userId: String(userId) }),
    queryFn: () => MypageAPI.getFolderList({ userId: String(userId) }),
  });
  const modalRefAdd = useRef<BottomSheetModal>(null);
  const [folderName, setFolderName] = useState('');
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable style={styles.headerRightPlus} onPress={handleHeaderRightPress}>
          <SvgXml xml={plus} />
        </Pressable>
      ),
    });
  }, []);

  const handleHeaderRightPress = () => {
    modalRefAdd.current?.present();
  };

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    [],
  );
  const queryClient = useQueryClient();

  const handleAddNewFolder = () => {
    if (!folderName?.length) return;
    UploadApis.createNewFolder(folderName)
      .then((res) => {
        modalRefAdd.current?.dismiss();
        setFolderName('');
        Toast.show({
          type: 'snackbar',
          text1: '폴더를 만들었어요',
          position: 'bottom',
        });
        queryClient.invalidateQueries(
          MypageQueryKeys.getNonModifiedList({ userId: String(userId) }),
        );
      })
      .catch(() => {
        Toast.show({
          type: 'snackbar',
          text1: '폴더 생성 실패',
          position: 'bottom',
        });
      });
  };

  if (folderListQuery?.isError) return <Text>에러가 발생했습니다.</Text>;
  if ((!userId && userId !== 0) || isLoading) return <MainLottie />;
  if (!userFolderList) return <Text>FETCHING FOLDERS UNSUCCESSFUL</Text>;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FolderEditSection userFolderList={userFolderList} />
      <BottomSheetModal
        ref={modalRefAdd}
        snapPoints={['52%', '60%']}
        backdropComponent={renderBackdrop}
      >
        <View>
          <BottomSheetHeader
            headerRightButton={() => (
              <HeaderRightButton
                backGroundColor={folderName?.length ? '#b0e817' : '#12131433'}
                textColor={folderName?.length ? 'black' : 'white'}
                borderLine={false}
                disabled={folderName?.length ? false : true}
                text="완료"
                handlePress={handleAddNewFolder}
              />
            )}
            onLeftButtonPress={() => modalRefAdd.current?.dismiss()}
            title="새 폴더 만들기"
            iconName="close"
          />
          <View style={{ padding: 16, paddingTop: 0 }}>
            <BlandTextInput setTextVal={setFolderName} />
          </View>
        </View>
      </BottomSheetModal>
    </SafeAreaView>
  );
};

export default FolderEditScreen;

const styles = StyleSheet.create({
  headerRightPlus: {
    marginRight: 16,
  },
});
