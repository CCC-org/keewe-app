import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Comments from '../../components/comments/Comments';
import MoreCommentsButton from '../../components/buttons/MoreCommentsButton';
import { useTheme } from 'react-native-paper';

const CommentsScreen = () => {
  const theme = useTheme();
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

  // useEffect(() => {
  // }, []);

  function handleMoreCommentsPress(idx) {
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
          <Comments
            key={idx}
            content={cur.content}
            nickname={cur.writer.name}
            title={cur.writer.title}
          />,
        ];
        const replies = cur.replies.map((current, index) => {
          return (
            <View key={index} style={{ marginLeft: 44 }}>
              <Comments
                key={index}
                content={current.content}
                nickname={current.writer.name}
                title={current.writer.title}
              />
              {cur.totalReply > 1 && moreCommentsBtnVisible[idx] ? (
                <View style={{ marginLeft: 60, marginTop: 10 }}>
                  <MoreCommentsButton
                    onPress={() => handleMoreCommentsPress(idx)}
                    number={cur.totalReply - 1}
                    backgroundColor={'white'}
                    textColor={`${theme.colors.graphic.black}cc`}
                  />
                </View>
              ) : null}
            </View>
          );
        });
        return comments.concat(replies);
      })}
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({});
