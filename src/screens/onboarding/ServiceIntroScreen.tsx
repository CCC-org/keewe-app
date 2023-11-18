import { StyleSheet, View, Dimensions, ScrollView, Image, SafeAreaView } from 'react-native';
import React, { useLayoutEffect, useRef, useState } from 'react';
import HeaderText from '../../components/texts/HeaderText';
import Stepper from '../../components/stepper/Stepper';
import ConditionalButton from '../../components/buttons/ConditionalButton';
import Carousel from 'react-native-reanimated-carousel';
import OnboardingIntroHeaderButton from '../../components/buttons/OnboardingIntroHeaderButton';

const fullScreenHeight = Dimensions.get('window').height;
const fullScreenWidth = Dimensions.get('window').width;

const ServiceIntroScreen = ({ navigation }) => {
  const [step, setStep] = useState(0);
  const styles = createStyle();
  const carouselRef = useRef<any>(null);

  const handleStep = (idx: number) => {
    setStep(idx);
  };

  function handlePress() {
    if (step === 2) {
      navigation.navigate('Feed');
      return;
    }
    setStep(step + 1);
    if (carouselRef?.current) {
      carouselRef.current.next();
    }
  }

  useLayoutEffect(() => {
    if (step === 2) {
      navigation.setOptions({
        headerRight: () => null,
      });
    } else {
      navigation.setOptions({
        headerRight: () => <OnboardingIntroHeaderButton />,
      });
    }
  }, [step]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Carousel
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          ref={carouselRef}
          width={fullScreenWidth}
          height={fullScreenHeight - 100}
          loop={false}
          onSnapToItem={(idx) => handleStep(idx)}
          data={[
            <>
              <View key={1} style={{ paddingTop: 32 }}>
                <Image
                  source={require('../../../assets/images/onboarding_01.png')}
                  style={styles.image}
                />
                <View style={styles.carouselItemCtn}>
                  <HeaderText header={'기억하고 싶은 콘텐츠, \n지나치지 말고 기록하세요'} />
                </View>
              </View>
            </>,

            <>
              <View key={2} style={{ paddingTop: 32 }}>
                <Image
                  source={require('../../../assets/images/onboarding_02.png')}
                  style={styles.image}
                />
                <View style={styles.carouselItemCtn}>
                  <HeaderText header={'꾸준하기 어렵다면 \n친구들과 함께 도전해요'} />
                </View>
              </View>
            </>,

            <>
              <View key={3} style={{ paddingTop: 32 }}>
                <Image
                  source={require('../../../assets/images/onboarding_03.png')}
                  style={styles.image}
                />
                <View style={styles.carouselItemCtn}>
                  <HeaderText header={'함께할수록 쉬워지는 기록 \n키위가 도와줄게요!'} />
                </View>
              </View>
            </>,
          ]}
          renderItem={({ item }) => item}
        />
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
        {/* </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServiceIntroScreen;

export function createStyle() {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
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
    },
    bottom: {
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingBottom: 0,
      border: '10px solid red',
    },
    nextButtonWithStepper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    nextButton: {
      marginVertical: 12,
    },
  });
}
