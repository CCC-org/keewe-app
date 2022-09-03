import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import HeaderText from '../../components/texts/HeaderText';
import TextInputDetail from '../../components/texts/TextInputDetail';
import ConditionalButton from '../../components/buttons/ConditionalButton';
import HeaderRightButton from '../../components/header/HeaderRightButton';

const ChallengeSubjectCreationScreen = ({ navigation, route }) => {
  const [subject, setSubject] = useState('');
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

  const handleSkipPress = () => {
    navigation.navigate('ChallengeCreationApproved', { form: { ...route.params.form } });
  };

  const handleCompletePress = () => {
    navigation.navigate('ChallengeCreationApproved', {
      form: { subject, ...route.params.form },
    });
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
