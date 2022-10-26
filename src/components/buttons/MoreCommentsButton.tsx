import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

interface MoreCommentsButtonProps {
  number: number | string;
}

const MoreCommentsButton = ({ number }: MoreCommentsButtonProps) => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Pressable style={{ ...styles.btn, backgroundColor: `${theme.colors.graphic.black}cc` }}>
        <MaterialIcons name="subdirectory-arrow-right" size={14} color="white" />
        <Text
          style={{
            fontWeight: '500',
            fontSize: 12,
            color: theme.colors.graphic.white,
            paddingLeft: 6,
          }}
        >
          댓글 {number}개 더보기
        </Text>
      </Pressable>
    </View>
  );
};

export default MoreCommentsButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 16,
  },
  btn: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 40,
  },
});
