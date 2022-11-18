import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import theme from '../../theme/light';
import main from '../../constants/Icons/Upload/UploadMainXml';
import shadow from '../../constants/Icons/Upload/UploadShadowXml';

interface CommentInputProps {
  onSubmit: (value: string) => void;
}

const CommentInput = ({ onSubmit }: CommentInputProps) => {
  const [input, setInput] = useState<string>('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'position' })} // position || padding
      keyboardVerticalOffset={Platform.select({ ios: 90 })}
    >
      <View style={styles.Container}>
        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <TextInput
              value={input}
              autoFocus={false}
              onChangeText={(value) => setInput(value)}
              placeholder="댓글 입력"
              multiline={true}
              style={{ ...theme.fonts.text.body2.regular }}
              selectionColor={'black'}
            ></TextInput>
          </View>
          <Pressable
            onPress={() => {
              return;
            }}
            style={{ alignItems: 'center', justifyContent: 'center' }}
          >
            <SvgXml xml={input === '' ? shadow : main} />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CommentInput;

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    bottom: 0,
    borderTopWidth: 1,
    borderColor: `${theme.colors.graphic.black}10`,
    backgroundColor: `${theme.colors.graphic.white}`,
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 12,
    marginHorizontal: 16,
  },
  input: {
    borderRadius: 12,
    backgroundColor: `${theme.colors.brand.surface.main}`,
    flex: 1,
    marginRight: 8,
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
});
