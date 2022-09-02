import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderText from '../../components/texts/HeaderText';
import { useTheme } from 'react-native-paper';
/**
 * https://docs.expo.dev/versions/latest/sdk/safe-area-context/
 * SafeAreaView from 'react-native-safe-area-context' is a all platform compatable component.
 */

const ChallengeCreationApprovedScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerShadowVisible: false,
      headerLeft: () => <View></View>,
      // headerLeft: () => null <- doesnt work.
    });
  }, []);

  return (
    <View style={styles.container}>
      <HeaderText
        header={'챌린지를 만들었어요!'}
        subTitle={
          '챌린지 목표를 성공하면 타이틀을 획득해요. 자세한 내용은 마이페이지에서 확인하세요'
        }
      ></HeaderText>
      <View style={{ marginTop: 16 }}>
        <Image style={styles.image} source={require('../../../assets/images/따봉도치.jpg')} />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Text style={{ fontSize: 16 }}>챌린지 이름</Text>
          <Text style={{ fontSize: 16, color: theme.colors.brand.onprimary.container }}>
            움파둠파 챌린지
          </Text>
        </View>
        <View style={styles.info}>
          <Text style={{ fontSize: 16 }}>나의 주제</Text>
          <Text style={{ fontSize: 16, color: theme.colors.brand.onprimary.container }}>
            굼바둠바 챌린지
          </Text>
        </View>
        <View style={styles.info}>
          <Text style={{ fontSize: 16 }}>나의 목표</Text>
          <Text style={{ fontSize: 16, color: theme.colors.brand.onprimary.container }}>
            매주 3번 기록 x 4주
          </Text>
        </View>
        <View style={styles.info}>
          <Text style={{ fontSize: 16 }}>종료일</Text>
          <Text style={{ fontSize: 16, color: theme.colors.brand.onprimary.container }}>
            1996.4.2 까지
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 16,
    paddingRight: 16,
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
});

export default ChallengeCreationApprovedScreen;
