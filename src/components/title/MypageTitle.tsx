import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

interface MypageTitleProps {
  label: string;
  condition: string;
  date: string;
}

const MypageTitle = ({ label, condition, date }: MypageTitleProps) => {
  const theme = useTheme();
  return (
    <View>
      <Text style={{ ...theme.fonts.text.body1.bold, color: theme.colors.graphic.black }}>
        {label}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text
          style={{ ...theme.fonts.text.body2.regular, color: `${theme.colors.graphic.black}80` }}
        >
          {condition} •{' '}
        </Text>
        <Text
          style={{ ...theme.fonts.text.caption1, color: theme.colors.brand.onprimary.container }}
        >
          {date}
        </Text>
      </View>
    </View>
  );
};

export default MypageTitle;

const styles = StyleSheet.create({});
