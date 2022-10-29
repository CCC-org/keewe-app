import { StyleSheet, Text, View } from 'react-native';
import React, { ReactElement } from 'react';
import theme from '../../theme/light';

interface ShareButtonProps {
  icon: ReactElement<any, any>;
  text: string;
}

const ShareButton = (props: ShareButtonProps) => {
  const { icon, text } = props;
  return (
    <View style={styles.container}>
      <View style={styles.button}>{icon}</View>
      <Text
        style={{
          ...theme.fonts.text.body2.regular,
          marginTop: 8,
          fontWeight: '400',
          fontSize: 14,
          color: '#121314',
        }}
      >
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#f1f1e9',
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
  },
});

export default ShareButton;
