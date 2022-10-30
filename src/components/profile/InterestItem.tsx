import React from 'react';
import { View, Text } from 'react-native';
import theme from '../../theme/light';

interface InterestItemProps {
  interest: string;
}

const InterestItem = ({ interest }: InterestItemProps) => {
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
      <Text style={{ ...theme.fonts.text.body2.regular, color: theme.colors.graphic.black }}>
        {interest}
      </Text>
    </View>
  );
};

export default InterestItem;
