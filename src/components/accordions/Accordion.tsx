import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

interface AccordionProps {
  title: JSX.Element;
  children: JSX.Element;
  isOpen: boolean;
  onClick: () => void;
  openHeight: number;
}

const Accordion = ({ title, children, isOpen, onClick, openHeight }: AccordionProps) => {
  const height = useRef(new Animated.Value(0)).current;
  const theme = useTheme();

  const open = () => {
    Animated.timing(height, {
      toValue: openHeight,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const close = () => {
    Animated.timing(height, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (isOpen === true) open();
    else close();
  }, [isOpen]);

  return (
    <>
      <TouchableOpacity onPress={onClick} style={styles.heading} activeOpacity={0.6}>
        {title}
        <Icon
          name={isOpen ? 'chevron-up-outline' : 'chevron-down-outline'}
          size={18}
          color={`${theme.colors.graphic.black}80`}
        />
      </TouchableOpacity>
      <Animated.View style={{ overflow: 'hidden', height: height }}>{children}</Animated.View>
    </>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  heading: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    margin: 10,
  },
  list: { overflow: 'hidden' },
});
