import { useQuery } from '@tanstack/react-query';
import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeaderRightButton from '../../../components/header/HeaderRightButton';
import MainLottie from '../../../components/lotties/MainLottie';
import theme from '../../../theme/light';
import { ChallengeAPI } from '../../../utils/api/ChallengeAPI';

const ChallengeEditScreen = ({ navigation, route }) => {
  const { data: challengeParticipation, isLoading: isChallengeParticipationLoading } = useQuery(
    ['challenge', 'participation'],
    ChallengeAPI.getChallengeParticipation,
  );

  if (isChallengeParticipationLoading) {
    return <MainLottie />;
  }

  const handleComplete = () => {
    return;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton
          text="완료"
          backGroundColor={theme.colors.brand.primary.main}
          textColor={theme.colors.graphic.black}
          borderLine={false}
          disabled={false}
          handlePress={() => handleComplete()}
        />
      ),
    });
  }, []);

  return (
    <>
      <View style={styles.Header}>
        <Text style={{ fontFamily: 'pretendardSemiBold', fontSize: 18 }}>
          {challengeParticipation?.name}
        </Text>
      </View>
      <View style={styles.SubHeader}>
        <Text
          style={{
            fontFamily: 'pretendardSemiBold',
            fontSize: 14,
            color: theme.colors.brand.onprimary.container,
          }}
        >
          {challengeParticipation?.interest}
        </Text>
      </View>
    </>
  );
};

export default ChallengeEditScreen;

const styles = StyleSheet.create({
  Header: {
    marginTop: 24,
    marginBottom: 10,
    marginHorizontal: 16,
  },
  SubHeader: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
});
