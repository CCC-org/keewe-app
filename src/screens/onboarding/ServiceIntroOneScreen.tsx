import { StyleSheet, View, Image, Dimensions, ScrollView } from 'react-native';
import React, { useRef, useState } from 'react';
import OnboardingIntroHeaderButton from '../../components/buttons/OnboardingIntroHeaderButton';
import HeaderText from '../../components/texts/HeaderText';
import Stepper from '../../components/stepper/Stepper';
import ConditionalButton from '../../components/buttons/ConditionalButton';
import Carousel from 'react-native-reanimated-carousel';

const fullScreenHeight = Dimensions.get('window').height;
const fullScreenWidth = Dimensions.get('window').width;

const ServiceIntroOneScreen = ({ navigation }) => {
  const [step, setStep] = useState(0);
  const styles = createStyle();
  const carouselRef = useRef<any>(null);
  function handlePress() {
    if (step === 2) {
      alert('navigate to Home');
      return;
    }
    setStep(step + 1);
    if (carouselRef?.current) {
      carouselRef.current.next();
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../../../assets/images/따봉도치.jpg')} style={styles.image} />
      <View style={styles.bottom}>
        <View style={styles.titleContainer}>
          <Carousel
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            ref={carouselRef}
            width={fullScreenWidth}
            height={205}
            onSnapToItem={setStep}
            data={[
              <View key={1} style={styles.carouselItemCtn}>
                <HeaderText key={1} header={'기억하고 싶은 콘텐츠, \n지나치지 말고 기록하세요'} />
              </View>,
              <View key={2} style={styles.carouselItemCtn}>
                <HeaderText key={1} header={'꾸준하기 어렵다면, \n친구들과 함께 도전해요'} />
              </View>,
              <View key={3} style={styles.carouselItemCtn}>
                <HeaderText key={1} header={'함께할수록 쉬워지는 기록, \n키위가 도와줄게요!'} />
              </View>,
            ]}
            renderItem={({ item }) => item}
          />
        </View>
        <View style={styles.nextButtonWithStepper}>
          <Stepper totalStep={3} currentStep={step + 1} />
          <View style={styles.nextButton}>
            {step === 2 ? (
              <ConditionalButton
                isActive={true}
                text={'시작하기'}
                color="#b0e817"
                textColor="black"
                width={343}
                onPress={handlePress}
              />
            ) : (
              <ConditionalButton
                isActive={true}
                text={'다음'}
                color="#e0f6a2"
                textColor="#486006"
                width={343}
                onPress={handlePress}
              />
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ServiceIntroOneScreen;

export function createStyle() {
  return StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    carouselItemCtn: {
      width: '100%',
      height: '100%',
      display: 'flex',
      paddingLeft: 24,
      paddingTop: 36,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },

    image: {
      borderColor: 'red',
      width: '100%',
      height: fullScreenHeight * 0.62,
    },
    titleContainer: {
      minWidth: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      // paddingLeft: 100,
    },
    bottom: {
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingBottom: 0,
      height: fullScreenHeight * 0.38,
    },
    nextButtonWithStepper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    nextButton: {
      marginVertical: 12,
    },
  });
}
