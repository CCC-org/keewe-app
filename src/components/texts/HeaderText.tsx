import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface HeaderTextProps {
  header: string;
  subTitle?: string;
}

const HeaderText = ({ header, subTitle }: HeaderTextProps) => {
  return (
    <View>
      <Text style={styles.header}>{header}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>
  );
};

export default HeaderText;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: '600',
  },
  subTitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#121314',
    opacity: 0.6,
  },
});
