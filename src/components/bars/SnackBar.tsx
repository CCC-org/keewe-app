import { Pressable, Text } from 'react-native';
import React from 'react';
import { Snackbar } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

interface SnackBarProps {
  visible: boolean;
  actionText: string;
  text: string;
  onDismiss: () => void;
  onPressSnackBar?: () => void;
  onPressAction?: () => void;
}

const SnackBar = ({
  visible,
  text,
  actionText,
  onDismiss,
  onPressSnackBar,
  onPressAction,
}: SnackBarProps) => {
  const theme = useTheme();
  return (
    <>
      <Pressable onPress={onPressSnackBar}>
        <Snackbar
          duration={3000}
          visible={visible}
          onDismiss={onDismiss}
          action={{
            label: actionText,
            color: theme.colors.graphic.coral,
          }}
          style={{ width: 343, height: 60, borderRadius: 8, paddingHorizontal: 10 }}
        >
          <Text>{text}</Text>
        </Snackbar>
      </Pressable>
    </>
  );
};

export default SnackBar;
