import React, { Dispatch, forwardRef, SetStateAction, useState } from 'react';
import { Text, View, TextInput, StyleSheet, Pressable, Platform } from 'react-native';
import { SvgXml } from 'react-native-svg';
import theme from '../../theme/light';
import main from '../../constants/Icons/Upload/UploadMainXml';
import shadow from '../../constants/Icons/Upload/UploadShadowXml';
import AnimatedHeightView from '../views/AnimatedHeightView';
import ClearSmallXml from '../../constants/Icons/Clear/ClearSmallXml';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InsightAPI } from '../../utils/api/InsightAPI';
import { useGetUserId } from '../../utils/hooks/useGetUserId';

interface CommentInputProps {
  insightId: number;
  replyInfo?: ReplyInfo;
  onCancelReply: () => void;
  onCreate: (response: CommentCreateResponse) => void;
  setComment: Dispatch<SetStateAction<Comment[]>>;
}

export type ReplyInfo = {
  id: number;
  nickname: string;
};

const bottom = Platform.OS === 'ios' ? 80 : 0;

const CommentInput = forwardRef(
  (
    { insightId, replyInfo, onCancelReply, onCreate, setComment }: CommentInputProps,
    ref: React.LegacyRef<TextInput>,
  ) => {
    const [input, setInput] = useState<string>('');
    const { mutate: createComment } = useMutation(InsightAPI.createComment, {
      onSuccess: (response) => {
        onCreate(response);
        setComment((prev) => {
          if (replyInfo) {
            const index = prev.findIndex((comment) => comment.id === replyInfo.id);
            const updatedReply = {
              ...prev[index],
              replies: [response.data as Reply, ...(prev[index].replies ?? [])],
            };

            return [...prev.slice(0, index), updatedReply, ...prev.slice(index + 1)];
          }
          return [response.data, ...prev] as Comment[];
        });
      },
    });

    const handleCancelReply = () => {
      onCancelReply();
    };

    return (
      <View style={[styles.Container, { bottom }]}>
        {replyInfo && (
          <AnimatedHeightView startHeight={0} endHeight={44} duration={200}>
            <View style={styles.reply}>
              <Text
                style={{
                  ...styles.replyText,
                  ...theme.fonts.text.body2.regular,
                  color: `${theme.colors.graphic.black}30`,
                }}
              >
                {replyInfo.nickname}님에게 답글 남기는 중
              </Text>
              <Pressable
                style={{
                  height: 'auto',
                  width: 48,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  handleCancelReply();
                }}
              >
                <SvgXml xml={ClearSmallXml} />
              </Pressable>
            </View>
          </AnimatedHeightView>
        )}
        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <TextInput
              ref={ref}
              value={input}
              autoFocus={false}
              onChangeText={(value) => setInput(value)}
              placeholder="댓글 입력"
              multiline={true}
              style={{ ...theme.fonts.text.body2.regular }}
              selectionColor={'black'}
            />
          </View>
          <Pressable
            onPress={() => {
              if (input == '') return;
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
  },
);

CommentInput.displayName = 'CommentInput';

export default CommentInput;

const styles = StyleSheet.create({
  Container: {
    position: 'absolute',
    width: '100%',
    borderTopWidth: 1,
    paddingBottom: 8,
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
  },
  replyText: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
  },
});
