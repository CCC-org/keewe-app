import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

interface MoreCommentsButtonProps {
  number: number | string;
  textColor: string;
  backgroundColor: string;
  onPress: () => void;
}

const MoreCommentsButton = ({
  number,
  textColor,
  backgroundColor,
  onPress,
}: MoreCommentsButtonProps) => {
  return (
    <>
      <Pressable onPress={onPress} style={{ ...styles.btn, backgroundColor: backgroundColor }}>
        <MaterialIcons name="subdirectory-arrow-right" size={14} color={textColor} />
        <Text
          style={{
            fontWeight: '500',
            fontSize: 12,
            color: textColor,
            paddingLeft: 6,
          }}
        >
          댓글 {number}개 더보기
        </Text>
      </Pressable>
    </>
  );
};

export default MoreCommentsButton;

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    width: 130,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 40,
  },
});
