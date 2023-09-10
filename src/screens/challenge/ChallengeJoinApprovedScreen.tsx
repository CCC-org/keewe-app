import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useRef } from 'react';
import { useTheme } from 'react-native-paper';
import HeaderText from '../../components/texts/HeaderText';
import ConditionalButton from '../../components/buttons/ConditionalButton';
import { timeConverter } from '../Main/challenge/constant';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import ChallengeInviteOption from '../../components/bottomsheet/ChallengeInviteOption';

const ChallengeJoinApprovedScreen = ({ navigation, route }) => {
  const { challengeId, challengeName, duration, insightPerWeek, myTopic, endDate } =
    route.params.form;

  const theme = useTheme();
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

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerShadowVisible: false,
      headerLeft: () => <View></View>,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderText
        header={'챌린지에 참여했어요!'}
        subTitle={
          '챌린지 목표를 성공하면 타이틀을 획득해요. 자세한 내용은 마이페이지에서 확인하세요'
        }
      ></HeaderText>
      <View style={{ marginTop: 16 }}>
        <Image
          style={styles.image}
          source={require('../../../assets/images/challenge/ChallengeCreate.png')}
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Text style={{ fontSize: 16 }}>참여 챌린지</Text>
          <Text style={{ fontSize: 16, color: theme.colors.brand.onprimary.container }}>
            {challengeName}
          </Text>
        </View>
        {!!myTopic?.length && (
          <View style={styles.info}>
            <Text style={{ fontSize: 16 }}>나의 주제</Text>
            <Text style={{ fontSize: 16, color: theme.colors.brand.onprimary.container }}>
              {myTopic}
            </Text>
          </View>
        )}
        <View style={styles.info}>
          <Text style={{ fontSize: 16 }}>나의 목표</Text>
          <Text style={{ fontSize: 16, color: theme.colors.brand.onprimary.container }}>
            매주 {insightPerWeek}번 기록 x {duration}주
          </Text>
        </View>
        <View style={styles.info}>
          <Text style={{ fontSize: 16 }}>종료일</Text>
          <Text style={{ fontSize: 16, color: theme.colors.brand.onprimary.container }}>
            {timeConverter(endDate)} 까지
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <View style={{ marginRight: 4 }}>
          <ConditionalButton
            isActive={true}
            text={'친구 초대하기'}
            color={theme.colors.brand.primary.container}
            width={168}
            textColor={theme.colors.brand.onprimary.container}
            onPress={() => handlePress()}
          />
        </View>
        <View style={{ marginLeft: 4 }}>
          <ConditionalButton
            isActive={true}
            text={'확인'}
            width={168}
            onPress={() => navigation.navigate('Tabs')}
          />
        </View>
      </View>

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
    </SafeAreaView>
  );
};

export default ChallengeJoinApprovedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  image: {
    width: '100%',
    height: 140,
  },
  infoContainer: {
    marginTop: 16,
    flexDirection: 'column',
  },
  info: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
