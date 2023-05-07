import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import HeaderText from '../../components/texts/HeaderText';
import { useTheme } from 'react-native-paper';
import ConditionalButton from '../../components/buttons/ConditionalButton';

const ChallengeCreationApprovedScreen = ({ navigation, route }) => {
  const { duration, endDate, insightPerWeek, myTopic, challengeName } = route.params.form.data;
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

  const mutateDate = (endDate: string) => {
    const date = endDate.replace(/-/g, '.');
    return date;
  };

  return (
    <View style={styles.container}>
      <HeaderText
        header={'챌린지를 만들었어요!'}
        subTitle={
          '챌린지 목표를 성공하면 타이틀을 획득해요. 자세한 내용은 마이페이지에서 확인하세요.'
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
          <Text style={{ fontSize: 16 }}>챌린지 이름</Text>
          <View style={{ width: '20%' }}></View>
          <View style={{ width: '60%' }}>
            <Text
              numberOfLines={2}
              style={{
                textAlign: 'right',
                fontSize: 16,
                color: theme.colors.brand.onprimary.container,
              }}
            >
              {challengeName}
            </Text>
          </View>
        </View>
        {!!myTopic.length && (
          <View style={styles.info}>
            <Text style={{ fontSize: 16 }}>나의 주제</Text>
            <View style={{ width: '20%' }}></View>
            <View style={{ width: '60%' }}>
              <Text
                numberOfLines={2}
                style={{
                  textAlign: 'right',
                  fontSize: 16,
                  color: theme.colors.brand.onprimary.container,
                }}
              >
                {myTopic}
              </Text>
            </View>
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
            {mutateDate(endDate)} 까지
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttons}>
          <ConditionalButton
            isActive={true}
            text={'친구 초대하기'}
            color={theme.colors.brand.primary.container}
            width={168}
            textColor={theme.colors.brand.onprimary.container}
            onPress={() => alert('pressed')}
          />
        </View>
        <View style={styles.buttons}>
          <ConditionalButton
            isActive={true}
            text={'확인'}
            width={168}
            onPress={() => navigation.navigate('Tabs')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttons: {
    marginHorizontal: 4,
  },
});

export default ChallengeCreationApprovedScreen;
