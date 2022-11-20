import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Comment from '../../components/comments/Comment';
import MoreCommentsButton from '../../components/buttons/MoreCommentsButton';
import { useTheme } from 'react-native-paper';
import { useQuery } from 'react-query';
import { InsightAPI, InsightQueryKeys } from '../../utils/api/InsightAPI';
import { querySuccessError } from '../../utils/helper/queryReponse/querySuccessError';

const CommentsScreen = () => {
  const theme = useTheme();

  // const { data, isLoading } = useQuery(
  //   InsightQueryKeys.getReplies({ parentId: 2 }),
  //   () => InsightAPI.getReplies({ parentId: 2 }),
  //   querySuccessError,
  // );

  const [data, setData] = useState({
    message: '성공',
    code: 200,
    data: [
      {
        id: 1,
        writer: {
          id: 1,
          name: '유승훈',
          title: '타이틀1',
          image: 'www.api-keewe.com/images',
        },
        content: '댓글의 내용1',
        createdAt: '2022-10-23T22:51:45.015338',
        replies: [
          {
            writer: {
              id: 2,
              name: '최지훈',
              title: '타이틀2',
              image: 'www.api-keewe.com/images',
            },
            id: 3,
            parentId: 1,
            content: '답글1 내용',
            createdAt: '2022-10-23T22:51:45.015338',
          },
        ],
        totalReply: 2,
      },
      {
        id: 2,
        writer: {
          id: 1,
          name: '유승훈',
          title: '타이틀1',
          image: 'www.api-keewe.com/images',
        },
        content: '댓글의 내용2',
        createdAt: '2022-10-23T22:51:45.015338',
        replies: [
          {
            writer: {
              id: 2,
              name: '최지훈',
              title: '타이틀2',
              image: 'www.api-keewe.com/images',
            },
            id: 4,
            parentId: 1,
            content: '답글2 내용',
            createdAt: '2022-10-23T22:51:45.015338',
          },
        ],
        totalReply: 2,
      },
    ],
  });

  const [dataReply, setDataReply] = useState({
    message: '성공',
    code: 200,
    data: [
      {
        writer: {
          id: 1,
          name: '유승훈',
          title: '타이틀1',
          image: 'www.api-keewe.com/images',
        },
        id: 2,
        parentId: 1,
        content: '답글1 내용',
        createdAt: '2022-10-23T22:51:44.800570',
      },
      {
        writer: {
          id: 2,
          name: '최지훈',
          title: '타이틀2',
          image: 'www.api-keewe.com/images',
        },
        id: 3,
        parentId: 1,
        content: '답글2 내용',
        createdAt: '2022-10-23T22:51:44.800570',
      },
    ],
  });

  const [moreCommentsBtnVisible, setMoreCommentsBtnVisible] = useState<boolean[]>(() => {
    const init: boolean[] = [];
    for (let i = 0; i < data.data.length; i++) {
      init.push(true);
    }
    return init;
  });

  function handleMoreCommentsPress(idx, id) {
    setMoreCommentsBtnVisible((current) => {
      const result = [...current];
      result[idx] = false;
      return result;
    });
  }

  return (
    <View>
      {data.data.map((cur, idx) => {
        const comments = [
          <Comment
            key={cur.id}
            content={cur.content}
            nickname={cur.writer.name}
            title={cur.writer.title}
            insightWriter={true}
          />,
        ];
        const reply = cur.replies.map((current, index) => {
          return (
            <View key={index} style={{ marginLeft: 44 }}>
              <Comment
                key={current.id}
                content={current.content}
                nickname={current.writer.name}
                title={current.writer.title}
                insightWriter={false}
              />
              {cur.totalReply > 1 ? (
                <View style={{ marginLeft: 60, marginTop: 10 }}>
                  <MoreCommentsButton
                    key={cur.id}
                    onPress={() => handleMoreCommentsPress(idx, cur.id)}
                    number={cur.totalReply - 1}
                    backgroundColor={'white'}
                    textColor={`${theme.colors.graphic.black}cc`}
                  />
                </View>
              ) : null}
            </View>
          );
        });
        const replies = dataReply.data.map((current, index) => {
          return (
            <View key={index} style={{ marginLeft: 44 }}>
              <Comment
                key={current.id}
                content={current.content}
                nickname={current.writer.name}
                title={current.writer.title}
              />
            </View>
          );
        });
        return moreCommentsBtnVisible[idx] ? comments.concat(reply) : comments.concat(replies);
      })}
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({});
