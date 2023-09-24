import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
import { plusXml } from '../../../assets/svgs/plusXml';

interface GoToChallengeCreationButtonProps {
  onPress: () => void;
}

const GoToChallengeCreationButton = ({ onPress }: GoToChallengeCreationButtonProps) => {
  return (
    <Pressable style={styles.pencil} onPress={onPress}>
      <SvgXml xml={plusXml} />
    </Pressable>
  );
};

export default GoToChallengeCreationButton;

const styles = StyleSheet.create({
  pencil: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#b0e817',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
});
