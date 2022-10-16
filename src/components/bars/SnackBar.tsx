import { Pressable, Text } from 'react-native';
import React from 'react';
import { Snackbar } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { FontText } from '../texts/StyledText';

interface SnackBarProps {
  visible: boolean;
  actionText: string;
  text: string;
  onDismiss?: () => void;
  onPressSnackBar?: () => void;
  onPressAction?: () => void;
  style?: any;
}

const SnackBar = (props: SnackBarProps) => {
  const theme = useTheme();
  const { visible, text, actionText, onDismiss, onPressSnackBar, onPressAction } = props;
  console.log('snackbar valid');
  return (
    <>
      <Pressable onPress={onPressSnackBar} style={[props.style, {}]}>
        <Snackbar
          duration={3000}
          visible={visible}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onDismiss={onDismiss || (() => {})}
          action={{
            label: actionText,
            color: theme.colors.graphic.coral,
          }}
          style={{
            width: 343,
            height: 60,
            borderRadius: 8,
            paddingHorizontal: 10,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <FontText>{text}</FontText>
        </Snackbar>
      </Pressable>
    </>
  );
};

export default SnackBar;
