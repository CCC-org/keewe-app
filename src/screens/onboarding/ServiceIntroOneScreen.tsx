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
              paddingLeft: 20,
            }}
            ref={carouselRef}
            width={fullScreenWidth}
            height={150}
            onSnapToItem={setStep}
            data={[
              <HeaderText key={1} header={'기억하고 싶은 콘텐츠, \n지나치지 말고 기록하2세요'} />,
              <HeaderText key={2} header={'기억하고 싶은 콘텐츠, \n지나치지 말고 기록하세요'} />,
              <HeaderText key={3} header={'기억하고 싶은 콘텐츠, \n지나치지 말고 기록하세요'} />,
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

    image: {
      borderColor: 'red',
      width: '100%',
      height: fullScreenHeight * 0.62,
    },
    titleContainer: {
      minWidth: '92%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 100,
    },
    bottom: {
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingTop: 30,
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
