import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

interface TodayBubbleProps {
  isFirst: boolean;
}

const TodayBubble = ({ isFirst }: TodayBubbleProps) => {
  const { fonts } = useTheme();
  const styles = createStyle(isFirst);
  return (
    <View style={styles.bubble}>
      <View style={styles.reverseTriangle}></View>
      <Text style={[fonts.text.caption1, styles.text]}>{isFirst ? '오늘부터 시작' : '오늘'}</Text>
    </View>
  );
};

export default TodayBubble;

const createStyle = (isFirst: boolean) =>
  StyleSheet.create({
    bubble: {
      top: -36,
      position: 'absolute',
      left: isFirst ? -12 : -8,
      width: isFirst ? 82 : 37,
      height: 24,
      borderRadius: 4,
      backgroundColor: '#121314cc',
      justifyContent: 'center',
      alignItems: 'center',
    },
    reverseTriangle: {
      position: 'absolute',
      top: 24,
      left: isFirst ? 17 : 12,
      width: 0,
      height: 0,
      borderLeftWidth: 6.5,
      borderRightWidth: 6.5,
      borderTopWidth: 6,
      borderTopColor: '#121314cc',
      borderStyle: 'solid',
      backgroundColor: 'transparent',
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: 'white',
    },
    text: {
      color: 'white',
    },
  });
