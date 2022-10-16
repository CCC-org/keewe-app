import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { FontText } from '../texts/StyledText';

interface InterestItemProps {
  interest: string;
}

const InterestItem = ({ interest }: InterestItemProps) => {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.colors.brand.surface.main,
        borderRadius: 4,
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: 4,
        paddingTop: 4,
        marginRight: 4,
      }}
    >
      <FontText style={{ color: theme.colors.graphic.black }}>{interest}</FontText>
    </View>
  );
};

export default InterestItem;
