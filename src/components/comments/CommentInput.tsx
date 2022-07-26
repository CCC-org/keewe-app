import React, { useState } from 'react';
import {
  Text,
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
import AnimatedHeightView from '../views/AnimatedHeightView';
import ClearSmallXml from '../../constants/Icons/Clear/ClearSmallXml';
import { useMutation, useQueryClient } from 'react-query';
import { InsightAPI } from '../../utils/api/InsightAPI';

interface CommentInputProps {
  insightId: number;
  replyInfo?: ReplyInfo;
  onCancelReply: () => void;
  onCreate: () => void;
}

export type ReplyInfo = {
  id: number;
  nickname: string;
};

const CommentInput = ({ insightId, replyInfo, onCancelReply, onCreate }: CommentInputProps) => {
  const [input, setInput] = useState<string>('');
  const queryClient = useQueryClient();
  const { mutate: createComment } = useMutation(InsightAPI.createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comment']);
      onCreate();
    },
  });

  const handleCancelReply = () => {
    onCancelReply();
  };

  return (
    <View style={styles.Container}>
      {replyInfo && (
        <AnimatedHeightView startHeight={0} endHeight={44} duration={200}>
          <View style={styles.reply}>
            <Text
              style={{
                ...theme.fonts.text.body2.regular,
                color: `${theme.colors.graphic.black}30`,
              }}
            >
              {replyInfo.nickname}님에게 답글 남기는 중
            </Text>
            <Pressable onPress={handleCancelReply}>
              <SvgXml xml={ClearSmallXml} />
            </Pressable>
          </View>
        </AnimatedHeightView>
      )}
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
            createComment({
              insightId,
              content: input,
              parentId: replyInfo?.id,
            });
            setInput('');
            return;
          }}
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <SvgXml xml={input === '' ? shadow : main} />
        </Pressable>
      </View>
    </View>
  );
};

export default CommentInput;

const styles = StyleSheet.create({
  Container: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    borderTopWidth: 1,
    borderColor: `${theme.colors.graphic.black}10`,
    backgroundColor: `${theme.colors.graphic.white}`,
  },
  inputContainer: {
    display: 'flex',
    overflow: 'hidden',
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
  reply: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 44,
    width: '100%',
    backgroundColor: `${theme.colors.brand.surface.container2}`,
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 20,
    paddingLeft: 20,
  },
});
