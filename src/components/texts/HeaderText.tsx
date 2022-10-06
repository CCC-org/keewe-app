import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

interface HeaderTextProps {
  header: string;
  subTitle?: string;
}
const HeaderText = ({ header, subTitle }: HeaderTextProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  if (subTitle === '') {
    subTitle = undefined;
  }
  return (
    <View>
      <Text style={styles.header}>{header}</Text>
      {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
    </View>
  );
};

export default HeaderText;

function createStyles(theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      fontSize: 30,
      fontWeight: '600',
      textAlign: 'left',
    },
    subTitle: {
      marginTop: 8,
      fontSize: 14,
      textAlign: 'left',
      color: '#121314',
      opacity: 0.6,
    },
  });
}
