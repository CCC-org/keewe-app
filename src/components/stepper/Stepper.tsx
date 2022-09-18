import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

interface StepperProps {
  totalStep: number;
  currentStep: number;
}

const Stepper = ({ totalStep, currentStep }: StepperProps) => {
  const theme = useTheme();
  function renderItems() {
    const Items: any = [];
    for (let i = 1; i <= totalStep; i++)
      Items.push(
        <View
          style={{
            width: currentStep === i ? 16 : 6,
            height: 6,
            backgroundColor:
              currentStep === i
                ? theme.colors.brand.primary.main
                : `${theme.colors.graphic.black}10`,
            ...styles.step,
          }}
        ></View>,
      );
    return Items;
  }
  return <View style={styles.box}>{renderItems()}</View>;
};

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 12,
  },
  step: {
    borderRadius: 30,
    margin: 4,
  },
});

export default Stepper;
