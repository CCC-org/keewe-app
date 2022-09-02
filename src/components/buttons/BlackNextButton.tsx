import { View, StyleSheet } from 'react-native';
import React from 'react';
import { IconButton, useTheme } from 'react-native-paper';

interface BlackNextButtonProps {
  isActive: boolean;
  handlePress: () => void;
}

const BlackNextButton = (props: BlackNextButtonProps) => {
  const { isActive, handlePress } = props;
  const theme = useTheme();

  return (
    <View
      style={{
        ...styles.nextButtonContainer,
        backgroundColor: theme.colors.graphic.black,
        opacity: isActive ? 1 : 0.2,
      }}
    >
      <IconButton icon="arrow-right" color="white" size={24} onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  nextButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 64,
    height: 64,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
});

export default BlackNextButton;
