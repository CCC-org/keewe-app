import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { ChallengeAPI } from '../../utils/api/ChallengeAPI';
import HeaderText from '../../components/texts/HeaderText';
import TextInputDetail from '../../components/texts/TextInputDetail';
import ConditionalButton from '../../components/buttons/ConditionalButton';
import HeaderRightButton from '../../components/header/HeaderRightButton';
import { Button } from 'react-native-paper';
import { getAccessToken } from '../../utils/hooks/asyncStorage/Login';

const ChallengeSubjectCreationScreen = ({ navigation, route }) => {
  const [subject, setSubject] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const createRequestParams = {
    participate: {
      duration: route.params.form.participationPerWeek[0],
      insightPerWeek: route.params.form.recordPerWeek[0],
      myTopic: subject,
    },
    interest: route.params.form.selectedCategory,
    name: route.params.form.subject,
    introduction: route.params.form.challengeInfo,
  };
  // const createRequestParams = {
  //   participate: {
  //     duration: 4,
  //     insightPerWeek: 5,
  //     myTopic: '하기 싫어요',
  //   },
  //   interest: '개발',
  //   name: '하루 한 문제 풀기',
  //   introduction: '알고리즘 하루에 하나씩 풀기',
  // };
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerShadowVisible: false,
      headerRight: () => (
        <HeaderRightButton
          text="건너뛰기"
          backGroundColor="white"
          textColor="black"
          borderLine={true}
          disabled={false}
          handlePress={handleSkipPress}
        />
      ),
    });
  }, []);

  useEffect(() => {
    if (subject.length > 25) {
      setErrorMessage('25자 이내로 입력하세요.');
    } else {
      setErrorMessage('');
    }
  }, [subject]);

  const { mutate: createChallenge } = useMutation(ChallengeAPI.create, {
    onSuccess: (data) => {
      console.log('onSuccess Data', data);
      navigation.navigate('ChallengeCreationApproved', {
        form: { data },
      });
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleSkipPress = () => {
    navigation.navigate('ChallengeCreationApproved', {
      form: { ...route.params.form },
    });
  };

  const handleCompletePress = () => {
    // console.log('handleCompletePress: ', createRequestParams);
    createChallenge(createRequestParams);
  };

  const handlePress = () => {
    getAccessToken().then((e) => console.log(e));
  };

  return (
    <View style={styles.container}>
      <View>
        <HeaderText
          header="나만의 주제를 정해보세요"
          subTitle='"챌린지 카테고리" 에 관한 주제면 좋아요. '
        />
        <TextInputDetail
          inputValue={subject}
          setInputValue={setSubject}
          label={''}
          placeholder={'나의 주제'}
          letterLimit={100}
          errorMessage={errorMessage}
        />
      </View>
      <View style={styles.buttonCtn}>
        <ConditionalButton
          isActive={!!subject.length}
          text={'완료'}
          width={343}
          onPress={handleCompletePress}
        />
      </View>
      <View>
        <Button onPress={handlePress}>Button</Button>
      </View>
    </View>
  );
};

export default ChallengeSubjectCreationScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonCtn: {
    // make it go to bottom of the screen
  },
});
